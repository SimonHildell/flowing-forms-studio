// ---------------------------------------------------------------------------
// Single source of truth for every project on the site.
// Add a project here and it appears in the grid, gets its own URL
// (#/project/<slug>) and can be linked from the isometric city.
// ---------------------------------------------------------------------------

// Stills (optimised webp)
import zephyrFront from "@/assets/opt/zephyrfront2.webp";
import z1 from "@/assets/opt/z1.webp";
import z2 from "@/assets/opt/z2.webp";
import zSection from "@/assets/opt/bigsection2.webp";
import zGpt from "@/assets/opt/gpt1.webp";
import zFront from "@/assets/opt/front.webp";
import zRender from "@/assets/opt/zr.webp";

import audioFront from "@/assets/opt/sound2front.webp";

import naturumFront from "@/assets/opt/straighteningfront.webp";
import naturumDetail from "@/assets/opt/detail.webp";
import naturumRender from "@/assets/opt/naturumrender.webp";
import naturumProcess from "@/assets/opt/naturumprocess.webp";
import naturumAxo from "@/assets/opt/naturumaxo.webp";

import nakaginFront from "@/assets/opt/growingfront.webp";
import dia1 from "@/assets/opt/diagram-1.webp";
import dia2 from "@/assets/opt/diagram-2.webp";
import dia3 from "@/assets/opt/diagram-3.webp";

import rainFront from "@/assets/opt/project-3.webp";
import v1 from "@/assets/opt/v1.webp";
import v2 from "@/assets/opt/v2.webp";
import v3 from "@/assets/opt/v3.webp";
import v4 from "@/assets/opt/v4.webp";
import v5 from "@/assets/V5.jpg";
import v6 from "@/assets/opt/v6.webp";
import vec from "@/assets/opt/vec.webp";

import studiosFront from "@/assets/opt/project-4.webp";
import axo from "@/assets/opt/exploaxo.webp";
import as1 from "@/assets/opt/as1.webp";
import as2 from "@/assets/opt/as2.webp";
import as3 from "@/assets/opt/as3.webp";

// Looping clips (former GIFs) + their poster frames
import zephyrLoop from "@/assets/Zephyrfront2.mp4";
import zephyrLoopPoster from "@/assets/opt/poster-Zephyrfront2.webp";
import foldLoop from "@/assets/Fold.mp4";
import foldPoster from "@/assets/opt/poster-Fold.webp";

import audioLoop from "@/assets/SOUND2FRONT.mp4";
import audioLoopPoster from "@/assets/opt/poster-SOUND2FRONT.webp";

import naturumLoop from "@/assets/Straighteningfront.mp4";
import naturumLoopPoster from "@/assets/opt/poster-Straighteningfront.webp";
import straighteningLoop from "@/assets/Final.mp4";
import straighteningPoster from "@/assets/opt/poster-Final.webp";
import forkLoop from "@/assets/fork.mp4";
import forkPoster from "@/assets/opt/poster-fork.webp";

import nakaginLoop from "@/assets/growingfront.mp4";
import nakaginLoopPoster from "@/assets/opt/poster-growingfront.webp";

// Full videos (with sound + controls)
import nakaginWalkthrough from "@/assets/opt/nakagin-walkthrough.mp4";
import verdisQuo from "@/assets/opt/VerdisQuo2.mp4";
import tel from "@/assets/opt/Tel.mp4";
import touchdesigner from "@/assets/opt/TD.mp4";
import python from "@/assets/opt/pyth2.mp4";

// Documents
import naturumReport from "@/assets/Report.pdf";

export type Media =
  | { type: "image"; src: string }
  /** GIF-replacement: autoplays, loops, silent, no controls, no progress bar. */
  | { type: "loop"; src: string; poster?: string }
  /** A real video: has sound and controls. */
  | { type: "video"; src: string; poster?: string };

export type Detail = string | { text: string; link: { label: string; href: string } };

export type Project = {
  id: number;
  /** URL segment — #/project/<slug>. Changing this changes the shareable link. */
  slug: string;
  title: string;
  category: string;
  year: string;
  /** Card fallback + detail page hero. */
  image: string;
  /** Optional looping clip shown on the card instead of the still. */
  thumbnailVideo?: string;
  thumbnailPoster?: string;
  description: string;
  details: Detail[];
  media: Media[];
};

export const projects: Project[] = [
  {
    id: 5,
    slug: "zephyr",
    title: "ZEPHYR",
    category: "Academic Project",
    year: "2026",
    image: zephyrFront,
    thumbnailVideo: zephyrLoop,
    thumbnailPoster: zephyrLoopPoster,
    description:
      "A breathing transport hub in Hässleholm. We figured out a panel system rooted in origami which is able to geometrically breathe, or rather expand in three dimensions. Based on projections for human traffic in the hub over the next years, we mapped projected passenger flow in Hässleholm over a full week, matched the peak capacity to the geometry, and let that data sculpt the structure across time. Not to optimize the space. Just as a gesture. The building is quietly acknowledging the people inside it.",
    details: [
      "Location: Hässleholm, Sweden",
      "Software: Rhinoceros, Grasshopper",
      "Together with: Finn Heinecke and Maja Popovic",
    ],
    media: [
      { type: "image", src: z1 },
      { type: "image", src: z2 },
      { type: "image", src: zSection },
      { type: "loop", src: foldLoop, poster: foldPoster },
      { type: "image", src: zGpt },
      { type: "image", src: zFront },
      { type: "image", src: zRender },
    ],
  },
  {
    id: 6,
    slug: "audio-interactive",
    title: "Audio interactive",
    category: "Academic + hobby project",
    year: "2026",
    image: audioFront,
    thumbnailVideo: audioLoop,
    thumbnailPoster: audioLoopPoster,
    description:
      "This is geometry that uses sound as its input to generate visuals. I have made it both as a hobby project but also as part of the course 'programming for architects'.",
    details: [
      {
        text: "Workflows: Python, Touchdesigner",
        link: { label: "Try it here", href: "./audio-visualizer.html" },
      },
    ],
    media: [
      { type: "video", src: verdisQuo },
      { type: "video", src: tel },
      { type: "video", src: touchdesigner },
      { type: "video", src: python },
    ],
  },
  {
    id: 1,
    slug: "naturum",
    title: "Naturum",
    category: "Academic Project",
    year: "2025",
    image: naturumFront,
    thumbnailVideo: naturumLoop,
    thumbnailPoster: naturumLoopPoster,
    description:
      "A hyperlocal public building that responds to its surroundings and building industry by exploring unconventional construction methods and material use. By utilizing pieces that are normally discarded in the forest industry today, this project sits on the edge of experimental and feasible.",
    details: [
      "Location: Breanäs, Sweden",
      "Area: 550 m²",
      "Software: Rhinoceros, Grasshopper",
      {
        text: "Together with: Theo Edfast",
        link: { label: "Read report here", href: naturumReport },
      },
    ],
    media: [
      { type: "image", src: naturumDetail },
      { type: "image", src: naturumRender },
      { type: "image", src: naturumProcess },
      { type: "image", src: naturumAxo },
      { type: "loop", src: straighteningLoop, poster: straighteningPoster },
      { type: "loop", src: forkLoop, poster: forkPoster },
    ],
  },
  {
    id: 2,
    slug: "nakagin-capsule",
    title: "Nakagin capsule",
    category: "Academic Project",
    year: "2025",
    image: nakaginFront,
    thumbnailVideo: nakaginLoop,
    thumbnailPoster: nakaginLoopPoster,
    description:
      "A project where the main goal for us was to learn the Rhino, Grasshopper, and Unreal Engine workflow. We went for the cyberpunky aesthetic and the narrative that some experiment went wrong. Watch the video and hit me up if you want to play in the file.",
    details: [
      "Software: Rhinoceros, Grasshopper, Unreal Engine",
      "Together with: Finn Heinecke and Mikolaj Szczerski",
    ],
    media: [
      { type: "video", src: nakaginWalkthrough },
      { type: "image", src: dia1 },
      { type: "image", src: dia2 },
      { type: "image", src: dia3 },
    ],
  },
  {
    id: 3,
    slug: "rain-hub",
    title: "Rain hub",
    category: "Bachelor project",
    year: "2025",
    image: rainFront,
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
    slug: "artist-studios",
    title: "Artist studios",
    category: "Academic Project",
    year: "2024",
    image: studiosFront,
    description:
      "A project blending public and private spaces for digital artists in Berlin. Through the building, an organic structure runs all the way from bottom to top reminding bypassers of the public garden on top.",
    details: [
      "Location: Neukölln, Berlin",
      "Software: Rhinoceros, Grasshopper, Revit",
    ],
    media: [
      { type: "image", src: axo },
      { type: "image", src: as1 },
      { type: "image", src: as2 },
      { type: "image", src: as3 },
    ],
  },
];

export const getProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug);
