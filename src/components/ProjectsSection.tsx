import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="work" className="py-20 md:py-32">
      <div className="container">
        <div className="mb-12 md:mb-20">
          <p className="text-caption mb-2">Selected Work</p>
          <h2 className="text-headline">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title}
              category={project.category}
              year={project.year}
              image={project.image}
              video={project.thumbnailVideo}
              poster={project.thumbnailPoster}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
