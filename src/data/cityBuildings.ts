// ---------------------------------------------------------------------------
// The isometric city.
//
// Every entry below matches a <g id="..."> inside src/assets/city/city-outlines.svg.
//
// TO ADD A BUILDING:
//   1. In Illustrator, trace the new building on the same artboard and name the
//      layer in lowercase (e.g. "newproject"). Re-export the SVG over
//      src/assets/city/city-outlines.svg (Object IDs: Layer Names).
//   2. Add one line here with the same id, the label you want on the line, and
//      the slug of the project it should open.
//
// `slug`  -> opens #/project/<slug>   (must exist in src/data/projects.ts)
// `href`  -> opens an external link instead
// neither -> the building still highlights and shows its title, but isn't clickable
// ---------------------------------------------------------------------------

export type CityBuilding = {
  id: string;
  title: string;
  slug?: string;
  href?: string;
};

export const cityBuildings: CityBuilding[] = [
  { id: "zephyr", title: "Zephyr", slug: "zephyr" },
  { id: "naturum", title: "Naturum", slug: "naturum" },
  { id: "rainhub", title: "Rain hub", slug: "rain-hub" },
  { id: "nagakin", title: "Nakagin capsule", slug: "nakagin-capsule" },
  { id: "artiststudios", title: "Artist studios", slug: "artist-studios" },

  // --- these point at draft projects in projects.ts. They only become
  //     clickable on the published site once you remove `draft: true` there.
  { id: "tratten", title: "Campustratten", slug: "campustratten" },
  { id: "sportcenter", title: "Sport center", slug: "sport-center" },
  { id: "byggcad", title: "Construction CAD", slug: "construction-cad" },
  { id: "notredam", title: "Notre-Dame", slug: "notre-dame" },
  { id: "raincatcher", title: "Rain catcher", slug: "rain-catcher" },
];
