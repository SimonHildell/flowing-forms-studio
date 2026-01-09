import { X } from "lucide-react";
import { useEffect } from "react";

interface ProjectDetailProps {
  project: {
    id: number;
    title: string;
    category: string;
    year: string;
    image: string;
    description: string;
    details: string[];
    images: string[];
  };
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 hover:opacity-60 transition-opacity"
        aria-label="Close project"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto">
        {/* Hero image */}
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Project info */}
        <div className="container py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* Left column - Title and meta */}
            <div className="md:col-span-5">
              <p className="text-caption mb-4">{project.category} — {project.year}</p>
              <h1 className="text-display mb-8">{project.title}</h1>
              
              <div className="space-y-4">
                {project.details.map((detail, index) => (
                  <div key={index} className="border-t border-border pt-4">
                    <p className="text-body text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Description */}
            <div className="md:col-span-7">
              <p className="text-body text-lg leading-relaxed mb-12">{project.description}</p>
              
              {/* Additional images */}
              <div className="space-y-8">
                {project.images.map((img, index) => (
                  <div key={index} className="overflow-hidden">
                    <img
                      src={img}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
