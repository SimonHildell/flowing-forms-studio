# simonhildell.com — portfolio site

React + Vite + Tailwind. The build output is plain static HTML/CSS/JS, which is
what GitHub Pages serves.

```sh
npm install      # first time, or after pulling
npm run dev      # local dev server with hot reload
npm run build    # production build -> docs/
npm run deploy   # build + push docs/ to the gh-pages branch
```

## Publishing

`npm run build` writes the whole site into `docs/`. GitHub Pages is served from
that folder on `main`, so publishing is:

```sh
npm run build
git add -A
git commit -m "site update"
git push
```

Asset URLs are relative (`base: "./"` in `vite.config.ts`), so the same build
works at `simonhildell.github.io/flowing-forms-studio/` **and** on a custom
domain — no rebuild needed if you add a CNAME later.

## Adding a project

Everything lives in **`src/data/projects.ts`**, in the `entries` list. The order
of that list is the order on the page — move a block to reorder it.

Copy the TEMPLATE at the bottom of that file, paste it where you want the
project to appear, and fill it in:

```ts
{
  slug: "my-project",          // the URL: #/project/my-project
  title: "My project",
  category: "Academic Project",
  year: "2026",
  folder: "my-project",        // src/assets/projects/my-project/
  draft: true,                 // delete this line to publish it
  description: "A sentence or two about the project.",
  details: ["Location: Somewhere", "Software: Rhinoceros, Grasshopper"],
}
```

Then make `src/assets/projects/my-project/` and drop the files in. **No imports
to write** — they're picked up automatically, in filename order:

| file | what it becomes |
|---|---|
| `cover.jpg` | the card image, and the big image atop the project page |
| `cover.mp4` | optional looping clip on the card |
| `hero.jpg` | optional. The big image at the top of the project page, when the card image doesn't crop well to a wide band |
| `01-name.jpg` | page images, in filename order — so number them |
| `02-name.loop.mp4` | silent looping clip (what a GIF used to be) |
| `03-name.mp4` | video with sound and play controls |

A clip can have its own still frame: give it the same name with an image
extension (`02-name.loop.mp4` + `02-name.loop.jpg`).

### Drafts

`draft: true` keeps a project off the published site while still showing it when
you run `npm run dev` — with a pink DRAFT tag on the card — so you can build it
up and click through to its page. Delete the line to publish.

A city building pointing at a draft stays un-clickable on the live site until
you publish the project, so nothing ever links into a void.

### How many show before "Load more"

One number, at the top of **`src/components/ProjectsSection.tsx`**:

```ts
const PROJECTS_VISIBLE = 4;
```

Set it to 6, 8, whatever. The Load more button appears only when there are more
than that, and it says how many are left; once expanded it becomes View less.

### The older six projects

Naturum, Zephyr and the rest still list their files by hand with `import`
statements — that's fine, it works, leave it. Only new projects need the
`folder` approach.

## The About portrait

Replace `src/assets/portrait.jpg` with your own photo, keeping that filename.
The crop is the `aspect-[4/5]` class in `src/components/AboutSection.tsx` —
change it to `aspect-square` if you'd rather not crop.

## The cursor

The magenta triangle is defined near the bottom of `src/index.css`, under
"Custom cursor". Two SVGs: the arrow, and the inverted one for anything
clickable. To recolour, change the `%23RRGGBB` values inside them (`%23` is an
escaped `#`). To resize, change `width`, `height` and `viewBox` together. Touch
devices never see it.

## Adding a building to the isometric city

1. **Illustrator** — open the city artwork, trace the new building on the same
   artboard (the artboard must stay 5196 × 3000), and name its layer in
   lowercase, e.g. `myproject`.
2. **Export** — `File → Export → Export As → SVG`, with
   *Styling: Presentation Attributes*, **Object IDs: Layer Names**,
   *Minify: off*, *Responsive: off*. Save over
   `src/assets/city/city-outlines.svg`.
3. **Register it** — add one line to `src/data/cityBuildings.ts`:

   ```ts
   { id: "myproject", title: "My project", slug: "my-project" },
   ```

   `slug` points at a project in `projects.ts`. Leave it out and the building
   still highlights and shows its title, but isn't clickable — handy for work
   that's in the drawing but doesn't have a page yet.

Stroke colour and weight in the SVG are ignored; the site styles the outlines
itself. Nothing else needs touching — hover, tint, the growing line, the label
and the link all come from those two files.

### Replacing the city image

Drop a new PNG in and regenerate the derivatives:

```sh
python3 - <<'PY'
from PIL import Image
im = Image.open("path/to/new-city.png").convert("RGB")
W, H = im.size
for w in (5196, 2600, 1300):
    r = im if w == W else im.resize((w, round(H*w/W)), Image.LANCZOS)
    r.save(f"src/assets/city/city-{w}.webp", "WEBP", quality=84, method=6)
    if w == 2600:
        r.save("src/assets/city/city-2600.jpg", "JPEG", quality=82, optimize=True, progressive=True)
PY
```

The artwork is drawn on white and displayed inverted (`.ffs-city-img` in
`src/index.css`). If you ever supply an already-dark image, delete that
`filter: invert(1)`.

## Media conventions

- **No GIFs.** Anything that used to be a GIF is an MP4 played by
  `LoopVideo` — autoplay, loop, muted, no controls, no progress bar. Identical
  look, roughly a tenth of the weight.
- Convert one with:
  `ffmpeg -i in.gif -an -vf "scale='min(1400,iw)':-2" -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4`
- Optimised stills live in `src/assets/opt/` as WebP; originals stay untouched
  next to them.
