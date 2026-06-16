# Articles — Naming Convention

Each artwork lives in its own folder inside `articles/`. The GitHub Action reads every
folder and auto-generates `manifest.json` before each deploy. **No HTML or JS changes
are needed when you add a new piece** — just drop a folder in here and push.

---

## Folder name

```
YYYY-MM-{title-slug}
```

| Part | Format | Example |
|------|--------|---------|
| Year | 4-digit | `2025` |
| Month | 2-digit (completion/publish month) | `03` |
| Title slug | Lowercase, hyphens, no special chars | `golden-hour-3` |

Full example: `2025-03-golden-hour-3`

Folders are sorted **newest first** (reverse-alphabetical), so the date prefix controls
gallery order.

---

## Files inside the folder

| Filename | Required | Description |
|----------|----------|-------------|
| `meta.json` | ✅ | All metadata (see below) |
| `cover.jpg` | Recommended | Main image shown on the gallery card and as the first modal view. Also accepts `.png` or `.webp`. |
| `cover-thumb.jpg` | Optional | Smaller/cropped version for the card if `cover.jpg` is very large. |
| `detail-1.jpg` | Optional | Extra view (increment the number for more: `detail-2.jpg`, `detail-3.jpg`, …) |
| `process.mp4` | Optional | Local process video. For YouTube/Vimeo, use the `video.url` field in `meta.json` instead. |

Rules:
- File names must be **lowercase with hyphens** (no spaces, no accents).
- Prefer `.jpg` for photos; use `.webp` for optimised variants.
- Video files must be `.mp4` or `.webm`.

---

## meta.json

```json
{
  "title": "Golden Hour #3",
  "medium": "Acrylic on canvas",
  "dimensions": "60×80 cm",
  "year": "2024",
  "price": "€240",
  "category": "painting",
  "status": "available",
  "description": "One paragraph describing the piece.",
  "images": [
    { "file": "cover.jpg",    "label": "Front view" },
    { "file": "detail-1.jpg", "label": "Detail — texture" },
    { "file": "detail-2.jpg", "label": "Natural light" }
  ],
  "videos": [
    { "file": "process.mp4",  "label": "Process video" },
    { "file": "detail.mp4",   "label": "Close-up detail" },
    { "url": "https://www.youtube.com/embed/VIDEO_ID", "label": "Studio walkthrough" }
  ]
}
```

### Fields

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Full display title |
| `medium` | string | Material / technique |
| `dimensions` | string | e.g. `"60×80 cm"` |
| `year` | string | Year of creation |
| `price` | string | With currency symbol, e.g. `"€240"` |
| `category` | string | One of: `painting` · `textile` · `sculpture` · `mixed` |
| `status` | string | `available` · `sold` · `not-for-sale` |
| `description` | string | One-paragraph text shown in the modal |
| `images` | array | Ordered list of image objects (first = cover) |
| `images[].file` | string\|null | Filename inside this folder, or `null` for a placeholder |
| `images[].color` | string | CSS gradient used when `file` is `null` (placeholder) |
| `images[].label` | string | Alt text / thumbnail label |
| `videos` | array | List of videos (can be empty `[]` or omitted). Each entry is one video. |
| `videos[].file` | string | Local video filename inside this folder (e.g. `process.mp4`) |
| `videos[].url` | string | YouTube embed URL instead of a local file (`https://www.youtube.com/embed/ID`) |
| `videos[].label` | string | Shown as thumbnail tooltip |

### Placeholder (no image file yet)

While you're preparing images, set `"file": null` and add a `"color"` gradient so the
gallery still renders:

```json
{ "file": null, "color": "linear-gradient(135deg,#c9a96e,#8b5e3c)", "label": "Front view" }
```

---

## Adding a new piece — checklist

1. Create `articles/YYYY-MM-{slug}/`
2. Add `meta.json` with all required fields
3. Drop in `cover.jpg` (and any `detail-N.jpg` files)
4. Reference image filenames in `meta.json`'s `images` array
5. **Push to `main`** — the deploy workflow regenerates `manifest.json` automatically

That's it. The gallery updates on the next deploy with no code changes.
