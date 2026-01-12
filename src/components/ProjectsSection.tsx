import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

import project1 from "@/assets/Straighteningfront.gif";
import project2 from "@/assets/growingfront.gif";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import detail from "@/assets/detail.png";
import render from "@/assets/naturumrender.jpg";
import process from "@/assets/naturumprocess.jpg";
import dia1 from "@/assets/diagram 1.jpg";
import dia2 from "@/assets/diagram 2.jpg";
import dia3 from "@/assets/diagram 3.jpg";
import naturumVideo from "@/assets/Video compressed.mp4";
import axo from "@/assets/Exploaxo.png";
import a1 from "@/assets/as1.jpg";
import a2 from "@/assets/as2.jpg";
import a3 from "@/assets/as3.jpg";
import v1 from "@/assets/V1.jpg";
import v2 from "@/assets/V2.jpg";
import v3 from "@/assets/V3.jpg";
import v4 from "@/assets/V4.jpg";
import v5 from "@/assets/V5.jpg";
import v6 from "@/assets/V6.jpg";
import str from "@/assets/Final.gif";
import turn from "@/assets/fork.gif";
import vec from "@/assets/VEC.jpg";
import naxo from "@/assets/naturumaxo.jpg";

// ---------------- TYPE DEFINITIONS ----------------
type Media = { type: "image" | "video"; src: string };

type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  details: string[];
  media: Media[];
};

// ---------------- PROJECTS ARRAY ----------------
const projects: Project[] = [
  {
    id: 1,
    title: "Naturum",
    category: "Academic Project",
    year: "2025",
    image: project1,
    description:
      "A hyperlocal public building that responds to its surroundings and building industry by exploring unconventional construction methods and material use. By utilizing pieces that are normally discarded in the forest industry today, this project sits on the edge of experimental and feasible.",
    details: [
      "Location: Breanäs, Sweden",
      "Area: 550 m²",
      "Software: Rhinoceros, Grasshopper",
      "Together with: Theo Edfast",
    ],
    media: [
      { type: "image", src: detail },
      { type: "image", src: render },
      { type: "image", src: process },
      { type: "image", src: naxo },
      { type: "image", src: str },
      { type: "image", src: turn },
    ],
  },
  {
    id: 2,
    title: "Nakagin capsule",
    category: "Academic Project",
    year: "2025",
    image: project2,
    description:
      "A project where the main goal for us was to learn the Rhino, Grasshopper, and Unreal Engine workflow. We went for the cyberpunky aesthetic and the narrative that some experiment went wrong. Watch the video and hit me up if you want to play in the file.",
    details: [
      "Software: Rhinoceros, Grasshopper, Unreal Engine",
      "Together with: Finn Heinecke and Mikolaj Szczerski",
    ],
    media: [
      { type: "video", src: naturumVideo },
      { type: "image", src: dia1 },
      { type: "image", src: dia2 },
      { type: "image", src: dia3 },
    ],
  },
  {
    id: 3,
    title: "Rain hub",
    category: "Bachelor project",
    year: "2025",
    image: project3,
    description:
      "A new way of thinking about a youth center by using rain as a resource rather than an obstacle. The design incorporates innovative water management systems and is designed with a roof that responds to how the rain falls on it. The building accommodates activities which normally disappear during rainy weather for teens.",
    details: [
      "Location: Mölndal, Sweden",
      "Software: Rhinoceros, Grasshopper, Revit",
    ],
    media: [
      { type: "image", src: v6 },
      { type: "image", src: v1 },
      { type: "image", src: v2 },
      { type: "image", src: v3 },
      { type: "image", src: v4 },
      { type: "image", src: v5 },
      { type: "image", src: vec },
    ],
  },
  {
    id: 4,
    title: "Artist studios",
    category: "Academic Project",
    year: "2024",
    image: project4,
    description:
      "A project blending public and private spaces for digital artists in Berlin. Through the building, an organic structure runs all the way from bottom to top reminding bypassers of the public garden on top.",
    details: [
      "Location: Neukölln, Berlin",
      "Software: Rhinoceros, Grasshopper, Revit",
    ],
    media: [
      { type: "image", src: axo },
      { type: "image", src: a1 },
      { type: "image", src: a2 },
      { type: "image", src: a3 },
    ],
  },
];

// ---------------- COMPONENT ----------------
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
