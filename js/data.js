// ================================================================
// ATELIER — Artwork Data
// HOW TO EDIT:
//   - Add/remove entries in the `pieces` object
//   - Each piece has: title, medium, price, description, category
//   - media: array of { type: 'image'|'video', src, thumb }
//     For 'image': src = image URL or path (e.g. images/mypiece.jpg)
//     For 'video': src = YouTube embed URL
//       e.g. "https://www.youtube.com/embed/VIDEO_ID"
//     thumb: small thumbnail URL or path
//
//   Placeholder colours below are replaced when you add real images.
// ================================================================

const pieces = {

  piece1: {
    title: "Golden Hour #3",
    medium: "Acrylic on canvas · 60×80 cm · 2024",
    price: "€240",
    category: "painting",
    description: "Layers of warm ochre, burnt sienna and raw umber build up the feeling of late afternoon light in a field. Applied with palette knives and wide brushes, the texture holds the light differently throughout the day. Unframed; edges painted.",
    media: [
      {
        type: "image",
        // Replace with your real image path e.g. "images/golden-hour-3-front.jpg"
        src: null,
        color: "linear-gradient(135deg,#c9a96e,#8b5e3c)",
        thumb: null,
        thumbColor: "linear-gradient(135deg,#c9a96e,#8b5e3c)",
        label: "Front view"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(160deg,#d4b885,#7a4f28)",
        thumb: null,
        thumbColor: "linear-gradient(160deg,#d4b885,#7a4f28)",
        label: "Detail — texture"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(120deg,#e8c87a,#a06030)",
        thumb: null,
        thumbColor: "linear-gradient(120deg,#e8c87a,#a06030)",
        label: "Natural light"
      },
      {
        // Process video — replace VIDEO_ID with your YouTube video ID
        type: "video",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumb: null,
        thumbColor: "#1a1612",
        label: "Process video"
      }
    ]
  },

  piece2: {
    title: "Woven Tides",
    medium: "Hand-woven wool on wooden frame · 45×60 cm · 2024",
    price: "€380",
    category: "textile",
    description: "A rhythmic composition in navy, slate and natural undyed wool. Each row is woven by hand on a frame loom over several weeks. The piece references the visual memory of the sea at dusk — not a literal landscape, but a felt one.",
    media: [
      {
        type: "image",
        src: null,
        color: "linear-gradient(135deg,#6b7fb3,#3d4f7c)",
        thumb: null,
        thumbColor: "linear-gradient(135deg,#6b7fb3,#3d4f7c)",
        label: "Full piece"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(160deg,#7a8fbf,#2d3a60)",
        thumb: null,
        thumbColor: "linear-gradient(160deg,#7a8fbf,#2d3a60)",
        label: "Weave detail"
      },
      {
        type: "video",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumb: null,
        thumbColor: "#1a1612",
        label: "Weaving process"
      }
    ]
  },

  piece3: {
    title: "Vessel No. 7",
    medium: "Hand-thrown stoneware, unglazed · 22 cm tall · 2025",
    price: "€195",
    category: "sculpture",
    description: "Thrown on a kick wheel and left unglazed to preserve the warmth of the raw clay. The slight asymmetry in the neck is intentional — a record of the particular throw, the particular morning. Comes with a certificate of authenticity.",
    media: [
      {
        type: "image",
        src: null,
        color: "linear-gradient(135deg,#b0a090,#6b5a4e)",
        thumb: null,
        thumbColor: "linear-gradient(135deg,#b0a090,#6b5a4e)",
        label: "Front"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(160deg,#c0b0a0,#5a4a3e)",
        thumb: null,
        thumbColor: "linear-gradient(160deg,#c0b0a0,#5a4a3e)",
        label: "Profile"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(110deg,#a09080,#7a6558)",
        thumb: null,
        thumbColor: "linear-gradient(110deg,#a09080,#7a6558)",
        label: "Base detail"
      }
    ]
  },

  piece4: {
    title: "Bloom & Ash",
    medium: "Paper, walnut ink, dried botanicals · 50×70 cm · 2024",
    price: "€310",
    category: "mixed",
    description: "Pressed and dried wildflowers are embedded into layers of handmade paper, with walnut ink washes drawing out their silhouettes. The result shifts between botanical record and abstract watercolour. Archival framing recommended.",
    media: [
      {
        type: "image",
        src: null,
        color: "linear-gradient(135deg,#d4a5a5,#8b4a4a)",
        thumb: null,
        thumbColor: "linear-gradient(135deg,#d4a5a5,#8b4a4a)",
        label: "Full composition"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(160deg,#e0b5b5,#7a3a3a)",
        thumb: null,
        thumbColor: "linear-gradient(160deg,#e0b5b5,#7a3a3a)",
        label: "Botanical detail"
      },
      {
        type: "video",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumb: null,
        thumbColor: "#1a1612",
        label: "Making process"
      }
    ]
  },

  piece5: {
    title: "Forest Breath",
    medium: "Watercolour on 300gsm cold press · 40×55 cm · 2025",
    price: "€165",
    category: "painting",
    description: "Wet-on-wet washes of sap green, Payne's grey and burnt umber, built in long sessions with the paper at a tilt. The soft blooms and bleeds are part of the piece — collaboration between paint and gravity.",
    media: [
      {
        type: "image",
        src: null,
        color: "linear-gradient(135deg,#a8c5b0,#4a7c59)",
        thumb: null,
        thumbColor: "linear-gradient(135deg,#a8c5b0,#4a7c59)",
        label: "Full painting"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(160deg,#b8d5c0,#3a6c49)",
        thumb: null,
        thumbColor: "linear-gradient(160deg,#b8d5c0,#3a6c49)",
        label: "Centre detail"
      }
    ]
  },

  piece6: {
    title: "Macramé Moon",
    medium: "Natural 3mm cotton cord, driftwood · 35×90 cm · 2024",
    price: "€220",
    category: "textile",
    description: "Hand-knotted using square knots and spiral half-hitches. The driftwood hanging rod was collected on the Dutch coast. Hangs from a single nail; ready for your wall.",
    media: [
      {
        type: "image",
        src: null,
        color: "linear-gradient(135deg,#e8d5b0,#c4a35a)",
        thumb: null,
        thumbColor: "linear-gradient(135deg,#e8d5b0,#c4a35a)",
        label: "Full piece"
      },
      {
        type: "image",
        src: null,
        color: "linear-gradient(160deg,#f0e0c0,#b0904a)",
        thumb: null,
        thumbColor: "linear-gradient(160deg,#f0e0c0,#b0904a)",
        label: "Knot detail"
      },
      {
        type: "video",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumb: null,
        thumbColor: "#1a1612",
        label: "Knotting process"
      }
    ]
  }

};
