// ---------------------------------------------------------------------------
// Every project on the site lives in the `entries` list below.
//
// ORDER
//   The order of the list is the order on the page. Move a block up or down
//   to reorder. The first PROJECTS_VISIBLE of them (set in
//   src/components/ProjectsSection.tsx) show before the "Load more" button.
//
// ADDING ONE
//   Copy the TEMPLATE at the bottom of this file, paste it where you want it
//   to appear, and drop the images into src/assets/projects/<folder>/.
//   Nothing else to wire up — see src/data/projectMedia.ts for file naming.
//
// DRAFTS
//   draft: true  keeps a project off the published site, but it still shows
//   while you run `npm run dev`, with a pink DRAFT tag on the card, so you
//   can build it up and click through to its page. Delete the line to
//   publish it.
// ---------------------------------------------------------------------------

import { readFolder, PLACEHOLDER_IMAGE } from "./projectMedia";

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

type ProjectInput = {
  id?: number;
  /** URL segment — #/project/<slug>. Changing this changes the shareable link. */
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  details: Detail[];
  /** Pull images and clips from src/assets/projects/<folder>/ automatically. */
  folder?: string;
  /** Hide from the published site; still visible in `npm run dev`. */
  draft?: boolean;
  /** Only for the older projects that list their files by hand. */
  image?: string;
  thumbnailVideo?: string;
  thumbnailPoster?: string;
  media?: Media[];
};

export type Project = Omit<ProjectInput, "image" | "media"> & {
  image: string;
  media: Media[];
};

const entries: ProjectInput[] = [
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

  // -------------------------------------------------------------------------
  // The five below are the buildings already drawn in the isometric city that
  // don't have a page yet. They're drafts: invisible on the published site,
  // visible when you run `npm run dev`.
  //
  // For each one: drop images into src/assets/projects/<folder>/, fill in the
  // text, then delete its `draft: true` line to publish it.
  // -------------------------------------------------------------------------
  {
    slug: "campustratten",
    title: "Campustratten",
    category: "Competition — 1st prize",
    year: "2026",
    folder: "campustratten",
    draft: true,
    description:
      "TODO — write the project description. Winning entry in the URBFORM 1:1 competition; to be built.",
    details: [
      "TODO: Location",
      "TODO: Software",
    ],
  },
  {
    slug: "sport-center",
    title: "Sport center",
    category: "TODO: category",
    year: "TODO",
    folder: "sport-center",
    draft: true,
    description: "TODO — write the project description.",
    details: ["TODO: Location", "TODO: Software"],
  },
  {
    slug: "construction-cad",
    title: "Construction CAD",
    category: "TODO: category",
    year: "TODO",
    folder: "construction-cad",
    draft: true,
    description: "TODO — write the project description.",
    details: ["TODO: Location", "TODO: Software"],
  },
  {
    slug: "notre-dame",
    title: "Notre-Dame",
    category: "TODO: category",
    year: "TODO",
    folder: "notre-dame",
    draft: true,
    description: "TODO — write the project description.",
    details: ["TODO: Location", "TODO: Software"],
  },
  {
    slug: "rain-catcher",
    title: "Rain catcher",
    category: "TODO: category",
    year: "TODO",
    folder: "rain-catcher",
    draft: true,
    description: "TODO — write the project description.",
    details: ["TODO: Location", "TODO: Software"],
  },
];

// ---------------------------------------------------------------------------
// TEMPLATE — copy this block, paste it into the list above where you want the
// project to appear, then put the images in src/assets/projects/<folder>/.
//
//   {
//     slug: "my-project",            // the URL: #/project/my-project
//     title: "My project",
//     category: "Academic Project",
//     year: "2026",
//     folder: "my-project",          // src/assets/projects/my-project/
//     draft: true,                   // delete this line to publish it
//     description: "A sentence or two about the project.",
//     details: [
//       "Location: Somewhere",
//       "Software: Rhinoceros, Grasshopper",
//       // a line with a link attached:
//       // { text: "Together with: ...", link: { label: "Read more", href: "https://..." } },
//     ],
//   },
//
// To link it from a building in the isometric city, add its slug in
// src/data/cityBuildings.ts.
// ---------------------------------------------------------------------------

/** Fill in whatever the project didn't state by hand from its media folder. */
const resolve = (entry: ProjectInput): Project => {
  const found = entry.folder ? readFolder(entry.folder) : undefined;
  return {
    ...entry,
    image: entry.image ?? found?.image ?? PLACEHOLDER_IMAGE,
    thumbnailVideo: entry.thumbnailVideo ?? found?.thumbnailVideo,
    thumbnailPoster: entry.thumbnailPoster ?? found?.thumbnailPoster,
    media: entry.media ?? found?.media ?? [],
  };
};

/** Drafts are visible while developing, never on the published site. */
export const SHOWING_DRAFTS = import.meta.env.DEV;

export const projects: Project[] = entries
  .filter((entry) => SHOWING_DRAFTS || !entry.draft)
  .map(resolve);

export const getProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug);
