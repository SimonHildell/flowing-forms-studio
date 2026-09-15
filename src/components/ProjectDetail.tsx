import { X } from "lucide-react";
import LoopVideo from "./LoopVideo";
import Player from "./Player";
import type { Project } from "@/data/projects";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 hover:opacity-60 transition-opacity"
        aria-label="Close project"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Hero image */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          fetchPriority="high"
          className="h-full w-full object-cover reveal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Project info */}
      <div className="container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left column - Title and meta */}
          <div className="md:col-span-5">
            <p className="text-caption mb-4">
              {project.category} — {project.year}
            </p>
            <h1 className="text-display mb-8">{project.title}</h1>

            <div className="space-y-4">
              {project.details.map((detail, index) => {
                const text = typeof detail === "string" ? detail : detail.text;
                const link = typeof detail === "string" ? undefined : detail.link;
                return (
                  <div key={index} className="border-t border-border pt-4">
                    <p className="text-body text-muted-foreground">{text}</p>
                    {link && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-body underline underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column - Description + media */}
          <div className="md:col-span-7">
            <p className="text-body text-lg leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="space-y-8">
              {project.media.map((item, index) => (
                <div key={index} className="overflow-hidden">
                  {item.type === "loop" ? (
                    <LoopVideo
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-auto object-cover"
                    />
                  ) : item.type === "video" ? (
                    <Player
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`${project.title} - Media ${index + 1}`}
                      loading={index > 1 ? "lazy" : undefined}
                      decoding="async"
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
