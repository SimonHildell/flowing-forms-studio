import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  {
    id: 1,
    title: "Morphogenetic Pavilion",
    category: "Installation",
    year: "2024",
    image: project1,
    description: "A parametric pavilion exploring the relationship between natural growth patterns and computational form-finding. The structure emerges from algorithms inspired by biological morphogenesis, creating a space that blurs the boundary between organic and artificial.",
    details: [
      "Location: Berlin, Germany",
      "Area: 450 m²",
      "Materials: GFRP, Steel",
      "Software: Grasshopper, Kangaroo"
    ],
    images: [project1, project2]
  },
  {
    id: 2,
    title: "Circular Museum",
    category: "Cultural",
    year: "2023",
    image: project2,
    description: "A museum designed around the concept of continuous circulation. The building's curved walls guide visitors through an endless loop of exhibition spaces, with natural light filtered through a parametric skylight system.",
    details: [
      "Location: Oslo, Norway",
      "Area: 12,000 m²",
      "Materials: Concrete, Glass",
      "Collaboration: Structure Studio"
    ],
    images: [project2, project3]
  },
  {
    id: 3,
    title: "Tessellated Facade",
    category: "Commercial",
    year: "2023",
    image: project3,
    description: "A kinetic facade system that responds to solar conditions and occupant preferences. Each panel is algorithmically positioned to optimize daylighting while creating a dynamic visual identity for the building.",
    details: [
      "Location: Dubai, UAE",
      "Area: 8,500 m²",
      "Materials: Aluminum, ETFE",
      "Awards: Facade Innovation Prize"
    ],
    images: [project3, project4]
  },
  {
    id: 4,
    title: "Vertical Ecosystem",
    category: "Mixed-Use",
    year: "2022",
    image: project4,
    description: "A high-rise that integrates biophilic design principles with computational optimization. The twisted form maximizes views while creating sky gardens that spiral up the building's height.",
    details: [
      "Location: Singapore",
      "Height: 280 m",
      "Materials: Steel, Glass, Greenery",
      "Status: Under Construction"
    ],
    images: [project4, project1]
  }
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
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
                title={project.title}
                category={project.category}
                year={project.year}
                image={project.image}
                onClick={() => setSelectedProject(project)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsSection;
