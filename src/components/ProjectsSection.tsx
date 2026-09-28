import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

/**
 * How many projects show before the "Load more" button.
 * Change this one number — 4, 6, 8 — and everything else follows.
 */
const PROJECTS_VISIBLE = 6;

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const shown = showAll ? projects : projects.slice(0, PROJECTS_VISIBLE);
  const remaining = projects.length - shown.length;

  return (
    <section id="work" className="py-20 md:py-32">
      <div className="container">
        <div className="mb-12 md:mb-20">
          <p className="text-caption mb-2">Selected Work</p>
          <h2 className="text-headline">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {shown.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              category={project.category}
              year={project.year}
              image={project.image}
              video={project.thumbnailVideo}
              poster={project.thumbnailPoster}
              draft={project.draft}
              // Cards revealed by the button shouldn't queue up behind a long
              // stagger, so the delay restarts with each row of the batch.
              index={index % PROJECTS_VISIBLE}
            />
          ))}
        </div>

        {remaining > 0 && (
          <div className="mt-12 md:mt-16 flex justify-center">
            <button
              type="button"
              className="ffs-more"
              onClick={() => setShowAll(true)}
              aria-label={`Show ${remaining} more project${remaining === 1 ? "" : "s"}`}
            >
              <span>Load more</span>
              <span className="ffs-more__count">{remaining}</span>
              <span className="ffs-more__arrow" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
