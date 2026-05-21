# Atelier — Handmade Art Portfolio

A clean, editorial-style portfolio website for handmade art. Features a filterable gallery, lightbox modal with multiple images and embedded video per piece, an About page, and a Contact form.

## Live site

Deployed via **GitHub Pages** (free hosting):  
`https://nispat.github.io/art-portfolio/`

---

## Adding / editing artwork

Open **`js/data.js`** — this is the only file you need to edit for content.

Each piece entry looks like this:

```js
piece1: {
  title: "Golden Hour #3",
  medium: "Acrylic on canvas · 60×80 cm · 2024",
  price: "€240",
  category: "painting",           // painting | textile | sculpture | mixed
  description: "Your description here.",
  media: [
    {
      type: "image",
      src: "images/golden-hour-front.jpg",   // path to your image file
      thumb: "images/golden-hour-front.jpg", // same or a smaller version
      label: "Front view"
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
      label: "Process video"
    }
  ]
}
```

### Steps to add a new piece

1. Upload your image files to the `images/` folder.
2. Copy an existing entry in `data.js`, give it a new key (e.g. `piece7`).
3. Fill in title, medium, price, category, description.
4. Add your image paths and/or YouTube embed URLs to `media`.
5. Add a matching `<article>` card in `index.html` (copy an existing one, update `onclick="openPiece('piece7')"` and `data-category`).
6. Commit and push — GitHub Pages redeploys automatically.

---

## Contact form

The form currently shows a success screen client-side only (no email is sent).  
To make it actually send emails, connect it to a free form service:

**Option A — [Formspree](https://formspree.io)** (free tier: 50 submissions/month)
1. Create a free account at formspree.io.
2. Create a new form, copy your endpoint URL.
3. In `contact.html`, change the `handleSubmit` function:

```js
async function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const data = new FormData(form);
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST', body: data, headers: { Accept: 'application/json' }
  });
  // show success
  form.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'flex';
}
```

---

## GitHub Pages setup (one-time)

1. Go to your repo on GitHub → **Settings → Pages**.
2. Under *Source*, select **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` handles the rest.
4. Your site will be live at `https://nispat.github.io/<repo-name>/`.

---

## Structure

```
art-portfolio/
├── index.html          # Gallery / home
├── about.html          # About page
├── contact.html        # Contact form
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # ← Edit this to manage artwork
│   └── gallery.js      # Filter, modal, lightbox logic
├── images/             # Put your artwork images here
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy to GitHub Pages
```
