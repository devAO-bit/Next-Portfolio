"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
   return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Abhishek</h1>

      <div className="space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${
              pathname === link.path
                ? "text-blue-500 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-blue-500`}
          >
            {link.name}
          </Link>
        ))}

        <ThemeToggle />
      </div>
    </nav>
  );
}