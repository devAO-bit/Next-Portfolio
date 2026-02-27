// scripts/sync-blogs.mjs
//
// Fetches all .md posts from your public blog repo via GitHub API,
// parses frontmatter + content, and rebuilds data/blogs.json.
//
// Run manually:  node scripts/sync-blogs.mjs
// Run in CI:     same command — GitHub Actions calls it the same way.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ─── Config ──────────────────────────────────────────────────────────────────

const BLOG_REPO_OWNER  = "devAO-bit";
const BLOG_REPO_NAME   = "abhishek-ojha-blogs";
const BLOG_REPO_BRANCH = "main";
const POSTS_FOLDER     = "posts";
const OUTPUT_PATH      = path.resolve("src/data/blogs.json");
const GITHUB_API       = "https://api.github.com";

const HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "sync-blogs-script",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** "my-post.md" → "my-post" */
function slugFromFilename(filename) {
  return filename.replace(/\.md$/i, "").toLowerCase();
}

/** Estimate read time from word count. Min 1 min. */
function calcReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Normalize tags — handles ALL common YAML formats:
 *   tags: ["Node.js", "MongoDB"]   ← inline JSON array
 *   tags: [Node.js, MongoDB]       ← inline YAML array
 *   tags:                          ← YAML block list
 *     - Node.js
 *     - MongoDB
 *   tags: Node.js                  ← single string
 */
function normalizeTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((t) => t.trim()).filter(Boolean);
  if (typeof raw === "string") return raw.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

/**
 * Clean raw markdown content:
 * - Strip standalone --- / *** / ___ horizontal rule lines
 * - Collapse 3+ blank lines into one blank line
 * - Trim
 */
function cleanContent(raw) {
  return raw
    .split("\n")
    .filter((line) => !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim()))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Validate required frontmatter fields.
 */
function validateFrontmatter(data) {
  const required = ["title", "date", "tags", "excerpt", "coverEmoji"];
  const missing = required.filter((k) => {
    const v = data[k];
    return v === undefined || v === null || v === "";
  });
  return { valid: missing.length === 0, missing };
}

/** Validate date is YYYY-MM-DD. */
function validateDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(date));
}

/** Enforce only one featured post (most recent wins if multiple). */
function enforceSingleFeatured(posts) {
  const featured = posts.filter((p) => p.featured);
  if (featured.length <= 1) return posts;
  console.warn(`⚠️   ${featured.length} posts marked featured — keeping the most recent one.`);
  featured.sort((a, b) => new Date(b.date) - new Date(a.date));
  const keepSlug = featured[0].slug;
  return posts.map((p) => ({ ...p, featured: p.slug === keepSlug }));
}

/**
 * Safe atomic write:
 * 1. Validates array is non-empty
 * 2. Validates JSON round-trip
 * 3. Writes to .tmp file first, then renames atomically
 * → The existing blogs.json is NEVER touched if anything goes wrong
 */
function safeWriteJSON(filePath, data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Post array is empty — refusing to overwrite blogs.json.");
  }

  let serialized;
  try {
    serialized = JSON.stringify(data, null, 2) + "\n";
    JSON.parse(serialized); // sanity check round-trip
  } catch (err) {
    throw new Error(`JSON serialization failed: ${err.message}`);
  }

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const tmpPath = filePath + ".tmp";
  fs.writeFileSync(tmpPath, serialized, "utf-8");
  fs.renameSync(tmpPath, filePath); // atomic — either fully written or not at all
}

// ─── GitHub API ───────────────────────────────────────────────────────────────

async function listPostFiles() {
  const url = `${GITHUB_API}/repos/${BLOG_REPO_OWNER}/${BLOG_REPO_NAME}/contents/${POSTS_FOLDER}?ref=${BLOG_REPO_BRANCH}`;
  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} ${res.statusText}\n${body}`);
  }

  const files = await res.json();

  if (!Array.isArray(files)) {
    throw new Error(
      `Unexpected GitHub API response. Is the "${POSTS_FOLDER}/" folder missing from the repo?`
    );
  }

  return files.filter((f) => f.type === "file" && f.name.endsWith(".md"));
}

async function fetchFileContent(downloadUrl) {
  const res = await fetch(downloadUrl, { headers: HEADERS });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.text();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍  Sync starting...");
  console.log(`    Repo   : ${BLOG_REPO_OWNER}/${BLOG_REPO_NAME}`);
  console.log(`    Branch : ${BLOG_REPO_BRANCH}`);
  console.log(`    Folder : ${POSTS_FOLDER}/`);
  console.log(`    Output : ${OUTPUT_PATH}\n`);

  // ── 1. List .md files ───────────────────────────────────────────────────────
  let files;
  try {
    files = await listPostFiles();
  } catch (err) {
    console.error("❌  Failed to list posts:", err.message);
    console.error("    blogs.json was NOT modified.");
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn("⚠️   No .md files found in posts/. blogs.json was NOT modified.");
    process.exit(0);
  }

  console.log(`📄  Found ${files.length} file(s):\n    ${files.map((f) => f.name).join("\n    ")}\n`);

  // ── 2. Fetch + parse each file ──────────────────────────────────────────────
  const posts   = [];
  const skipped = [];

  for (const file of files) {
    process.stdout.write(`    Parsing ${file.name} ... `);

    // Fetch
    let raw;
    try {
      raw = await fetchFileContent(file.download_url);
    } catch (err) {
      console.log(`SKIP — fetch failed: ${err.message}`);
      skipped.push({ name: file.name, reason: `fetch failed: ${err.message}` });
      continue;
    }

    // Parse frontmatter
    let parsed;
    try {
      parsed = matter(raw);
    } catch (err) {
      console.log(`SKIP — frontmatter parse error: ${err.message}`);
      skipped.push({ name: file.name, reason: `frontmatter parse error: ${err.message}` });
      continue;
    }

    const { data, content } = parsed;

    // Validate required fields
    const { valid, missing } = validateFrontmatter(data);
    if (!valid) {
      console.log(`SKIP — missing frontmatter: ${missing.join(", ")}`);
      skipped.push({ name: file.name, reason: `missing: ${missing.join(", ")}` });
      continue;
    }

    // Validate date
    if (!validateDate(data.date)) {
      console.log(`SKIP — date must be YYYY-MM-DD, got: "${data.date}"`);
      skipped.push({ name: file.name, reason: `invalid date: ${data.date}` });
      continue;
    }

    const slug     = slugFromFilename(file.name);
    const tags     = normalizeTags(data.tags);
    const cleaned  = cleanContent(content);
    const readTime = data.readTime ? Number(data.readTime) : calcReadTime(cleaned);

    posts.push({
      slug,
      title:      String(data.title).trim(),
      excerpt:    String(data.excerpt).trim(),
      content:    cleaned,
      tags,
      readTime,
      date:       String(data.date),
      featured:   data.featured === true,
      coverEmoji: String(data.coverEmoji).trim(),
    });

    console.log("OK ✓");
  }

  console.log("");

  // ── 3. Report skipped ───────────────────────────────────────────────────────
  if (skipped.length > 0) {
    console.warn(`⚠️   ${skipped.length} file(s) skipped:`);
    skipped.forEach(({ name, reason }) => console.warn(`    - ${name}: ${reason}`));
    console.warn("");
  }

  // ── 4. Guard: nothing parsed ────────────────────────────────────────────────
  if (posts.length === 0) {
    console.error("❌  No valid posts parsed. blogs.json was NOT modified.");
    process.exit(1);
  }

  // ── 5. Sort newest first ────────────────────────────────────────────────────
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── 6. Enforce single featured ──────────────────────────────────────────────
  const finalPosts = enforceSingleFeatured(posts);

  // ── 7. Safe atomic write ────────────────────────────────────────────────────
  try {
    safeWriteJSON(OUTPUT_PATH, finalPosts);
  } catch (err) {
    console.error(`❌  Write failed: ${err.message}`);
    process.exit(1);
  }

  // ── 8. Success report ───────────────────────────────────────────────────────
  console.log(`✅  Wrote ${finalPosts.length} post(s) to ${OUTPUT_PATH}`);
  finalPosts.forEach((p) => {
    console.log(`    ${p.featured ? "★" : "·"} [${p.date}]  ${p.slug}`);
  });

  if (skipped.length > 0) {
    console.log(`\n⚠️   ${skipped.length} post(s) were skipped — fix the issues above and re-run.`);
  }
}

main().catch((err) => {
  console.error("❌  Unexpected error:", err.message);
  process.exit(1);
});
