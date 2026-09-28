import type { Media } from "./projects";

/**
 * Drop-in media folders.
 *
 * Any project with `folder: "<name>"` gets its images and clips from
 * `src/assets/projects/<name>/` automatically — no imports to write, no code
 * to touch. Drop files in, refresh, done.
 *
 * FILE NAMING
 *   cover.jpg / .png / .webp   the card image, and the big image at the top of
 *                              the project page unless there's a hero below
 *   cover.mp4                  optional looping clip on the card (cover.jpg
 *                              is used as its still frame while it loads)
 *   hero.jpg / .png / .webp    optional. The big image at the top of the
 *                              project page, when the card image doesn't crop
 *                              well to a wide band
 *   01-whatever.jpg            the images down the project page, shown in
 *   02-whatever.png            filename order — so number them
 *   03-whatever.loop.mp4       a silent looping clip (what a GIF used to be)
 *   04-whatever.mp4            a proper video, with sound and play controls
 *
 * A clip can have its own still frame by giving it the same name with an
 * image extension: `03-fold.loop.mp4` + `03-fold.loop.jpg`.
 */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO_EXT = /\.mp4$/i;
const LOOP_MARK = /\.loop\.mp4$/i;

// Vite reads this at build time; the paths must stay literal.
const files = import.meta.glob("../assets/projects/*/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,avif,gif,mp4,MP4}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type Entry = { name: string; url: string };

const byFolder: Record<string, Entry[]> = {};
for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/projects\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, folder, name] = match;
  if (name.startsWith(".")) continue; // .DS_Store and friends
  (byFolder[folder] ||= []).push({ name, url });
}

/** So 10-x sorts after 9-x rather than before it. */
const naturally = (a: Entry, b: Entry) =>
  a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });

const stem = (name: string) => name.replace(/\.[^.]+$/, "");

/** Shown when a project folder is still empty. */
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'%3E%3Crect width='800' height='1000' fill='%23e8e8e8'/%3E%3Cpath d='M0 0l800 1000M800 0L0 1000' stroke='%23d2d2d2' stroke-width='2'/%3E%3C/svg%3E";

export type FolderMedia = {
  image?: string;
  thumbnailVideo?: string;
  thumbnailPoster?: string;
  media: Media[];
};

export const readFolder = (folder: string): FolderMedia => {
  const entries = (byFolder[folder] ?? []).slice().sort(naturally);

  const posterFor = (name: string) =>
    entries.find((e) => IMAGE_EXT.test(e.name) && stem(e.name) === stem(name))?.url;

  const cover = entries.find((e) => stem(e.name) === "cover" && IMAGE_EXT.test(e.name));
  const coverClip = entries.find((e) => e.name.toLowerCase() === "cover.mp4");
  const hero = entries.find((e) => stem(e.name) === "hero" && IMAGE_EXT.test(e.name));

  const media: Media[] = [];
  for (const entry of entries) {
    if (stem(entry.name) === "cover" || entry.name.toLowerCase() === "cover.mp4") continue;
    if (stem(entry.name) === "hero") continue;
    if (IMAGE_EXT.test(entry.name)) {
      // Skip images that exist only to be a clip's still frame.
      const isPoster = entries.some(
        (e) => VIDEO_EXT.test(e.name) && stem(e.name) === stem(entry.name),
      );
      if (!isPoster) media.push({ type: "image", src: entry.url });
    } else if (LOOP_MARK.test(entry.name)) {
      media.push({ type: "loop", src: entry.url, poster: posterFor(entry.name) });
    } else if (VIDEO_EXT.test(entry.name)) {
      media.push({ type: "video", src: entry.url, poster: posterFor(entry.name) });
    }
  }

  return {
    image: hero?.url ?? cover?.url,
    thumbnailVideo: coverClip?.url,
    thumbnailPoster: cover?.url,
    media,
  };
};

/** How many files are sitting in a folder — used for the dev-only warning. */
export const folderCount = (folder: string) => (byFolder[folder] ?? []).length;
