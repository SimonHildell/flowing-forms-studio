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

Everything lives in **`src/data/projects.ts`**. Add an object to the `projects`
array:

```ts
{
  id: 7,
  slug: "my-project",          // the URL: #/project/my-project
  title: "My project",
  category: "Academic Project",
  year: "2026",
  image: someStill,            // card fallback + detail page hero
  thumbnailVideo: someLoop,    // optional looping clip on the card
  thumbnailPoster: somePoster,
  description: "...",
  details: [
    "Location: Somewhere",
    { text: "Together with: ...", link: { label: "Read report", href: reportPdf } },
  ],
  media: [
    { type: "image", src: img1 },
    { type: "loop",  src: clip, poster: clipPoster },  // GIF-style: silent, looping, no controls
    { type: "video", src: film },                      // real video: sound + controls
  ],
}
```

Import the files at the top of that same file. Order in the array is the order
on the page.

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
