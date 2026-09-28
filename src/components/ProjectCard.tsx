import { Link } from "react-router-dom";
import LoopVideo from "./LoopVideo";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string;
  poster?: string;
  /** Unpublished — shows a tag while developing, never reaches the live site. */
  draft?: boolean;
  index: number;
}

const ProjectCard = ({
  slug,
  title,
  category,
  year,
  image,
  video,
  poster,
  draft,
  index,
}: ProjectCardProps) => {
  return (
    <Link
      to={`/project/${slug}`}
      state={{ from: "grid" }}
      onClick={() => sessionStorage.setItem("ffs:home-scroll", String(window.scrollY))}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
    >
      <article
        className="project-card group reveal-up"
        style={{ animationDelay: `${0.2 + index * 0.15}s` }}
      >
        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
          {draft && <span className="ffs-draft-badge">Draft</span>}
          {video ? (
            <LoopVideo
              src={video}
              poster={poster ?? image}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
            />
          ) : (
            <img
              src={image}
              alt={title}
              loading={index > 1 ? "lazy" : undefined}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Project info overlay */}
          <div className="project-info absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-foreground/80 to-transparent">
            <p className="text-caption text-primary-foreground/70 mb-1">{category} {year}</p>
            <h3 className="text-headline text-primary-foreground">{title}</h3>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
