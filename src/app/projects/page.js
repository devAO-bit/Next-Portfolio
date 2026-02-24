import projects from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}