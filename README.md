# Metal Wire Art — Website

Static, no-build website for Ginger Phoenix's **Metal Wire Art** (handmade since 2017).
Purpose: a jury-first showcase of her hand-woven metal wire sculptures.

## Contents

- `index.html` — Hero, About, Gallery, Events, Contact, lightbox viewer
- `styles.css` — black / ivory / gold gallery theme, responsive
- `script.js` — gallery rendering, category filters, lightbox, mobile nav
- `gallery-data.js` — auto-generated data for the 40 gallery photos
  (regenerate with `/tmp/build_gallery.py` if photos change)
- `images/logo.webp` — the Metal Wire Art logo
- `images/gallery/` — 40 full-size photos (descriptive English filenames)
- `images/thumbs/` — 40 optimized thumbnails (~70 KB each) used in the grid

## Preview locally

```bash
cd ~/workspace/goals/metalwireart-craft-shows/site
python3 -m http.server 8000
# open http://localhost:8000 in a browser
```

## Deploy

Any static host works — no build step, no dependencies:

- **Netlify:** drag-and-drop the `site/` folder at app.netlify.com/drop, or connect the
  repo and publish this directory.
- **GitHub Pages:** push the repo, then Settings → Pages → deploy from the folder
  (or move these files to the repo root / `docs/` as Pages requires).

The site is a single static page with relative asset paths, so it works at any
domain or sub-path without changes.

## Updating the gallery

To swap or add photos:

1. Put new photos in the source gallery folder.
2. Re-run `/tmp/build_gallery.py` (it copies, renames, and regenerates thumbnails
   and `gallery-data.js`).
3. Commit and redeploy — no build step needed.

## Notes

- No prices, cart, or checkout — this is a showcase/jury site by design.
- Gallery categories: Trees, Dragons, Birds, Animals, Flowers & Botanicals, Display.
- Event dates are only listed when confirmed; unverified details are omitted.
