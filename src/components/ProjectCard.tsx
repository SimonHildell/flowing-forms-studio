interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  image: string;
  onClick: () => void;
  index: number;
}

const ProjectCard = ({ title, category, year, image, onClick, index }: ProjectCardProps) => {
  return (
    <article
      className="project-card group animate-fade-in-up opacity-0"
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Project info overlay */}
        <div className="project-info absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-foreground/80 to-transparent">
          <p className="text-caption text-primary-foreground/70 mb-1">{category} — {year}</p>
          <h3 className="text-headline text-primary-foreground">{title}</h3>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
