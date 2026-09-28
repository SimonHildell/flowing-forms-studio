import { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

/**
 * How many projects show before the "Load more" button.
 * Change this one number — 4, 6, 8 — and everything else follows.
 */
const PROJECTS_VISIBLE = 4;

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const shown = showAll ? projects : projects.slice(0, PROJECTS_VISIBLE);
  const hidden = projects.length - PROJECTS_VISIBLE;

  const collapse = () => {
    setShowAll(false);
    // Don't leave the visitor stranded far below a grid that just got shorter.
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="work" ref={sectionRef} className="py-20 md:py-32">
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
              // stagger, so the delay restarts with each batch.
              index={index % PROJECTS_VISIBLE}
            />
          ))}
        </div>

        {hidden > 0 && (
          <div className="mt-12 md:mt-16 flex justify-center">
            {showAll ? (
              <button type="button" className="ffs-more" onClick={collapse}>
                <span>View less</span>
                <span className="ffs-more__arrow is-up" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="ffs-more"
                onClick={() => setShowAll(true)}
                aria-label={`Show ${hidden} more project${hidden === 1 ? "" : "s"}`}
              >
                <span>Load more</span>
                <span className="ffs-more__count">{hidden}</span>
                <span className="ffs-more__arrow" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
