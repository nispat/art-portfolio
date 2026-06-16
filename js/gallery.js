// ================================================================
// ATELIER — Gallery & Modal JS
// ================================================================

// ---------- NAV TOGGLE ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ---------- FILTER ----------
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.piece').forEach(p => {
      const show = filter === 'all' || p.dataset.category === filter;
      p.style.display = show ? '' : 'none';
      if (show) { p.style.animation = 'none'; p.offsetHeight; p.style.animation = ''; }
    });
  });
});

// ---------- GALLERY LOADING ----------
const galleryData = {};

const CATEGORY_LABEL = {
  painting:  'Painting',
  textile:   'Textile',
  sculpture: 'Sculpture',
  mixed:     'Mixed Media'
};

async function loadGallery() {
  const gallery = document.getElementById('gallery');
  try {
    const res = await fetch('articles/manifest.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { articles } = await res.json();

    gallery.innerHTML = '';

    articles.forEach(article => {
      // Build unified media array used by the modal
      article._media = [
        ...article.images.map(img => ({
          type:       'image',
          src:        img.src   || null,
          color:      img.color || null,
          thumb:      img.src   || null,
          thumbColor: img.color || '#ccc',
          label:      img.label || ''
        })),
        // Support 'videos' array (new) and legacy 'video' single object
        ...(article.videos || (article.video ? [{ src: article.video.src || article.video.url, label: article.video.label }] : [])).map(v => ({
          type:       'video',
          src:        v.src || v.url,
          thumb:      null,
          thumbColor: '#1a1612',
          label:      v.label || 'Video'
        }))
      ];

      galleryData[article.id] = article;

      // Card cover: first image src, or its placeholder colour
      const cover = article.images[0] || {};
      const coverStyle = cover.src
        ? `background-image:url('${cover.src}');background-size:cover;background-position:center`
        : `background:${cover.color || '#ccc'}`;

      const label      = CATEGORY_LABEL[article.category] || article.category;
      const mediumLine = [article.medium, article.dimensions].filter(Boolean).join(' · ');

      const el = document.createElement('article');
      el.className          = 'piece';
      el.dataset.category   = article.category;
      el.setAttribute('onclick', `openPiece('${article.id}')`);
      el.innerHTML = `
        <div class="piece-img-wrap">
          <div class="piece-img" style="${coverStyle}"></div>
          <span class="piece-badge">${label}</span>
        </div>
        <div class="piece-info">
          <h2 class="piece-title">${article.title}</h2>
          <p class="piece-medium">${mediumLine}</p>
          <span class="piece-price">${article.price}</span>
        </div>`;
      gallery.appendChild(el);
    });

  } catch (err) {
    gallery.innerHTML = '<p style="padding:2rem;text-align:center;color:#888">Gallery unavailable — please try again later.</p>';
    console.error('Gallery load failed:', err);
  }
}

// ---------- MODAL ----------
let currentPieceId    = null;
let currentMediaIndex = 0;

function openPiece(id) {
  const article = galleryData[id];
  if (!article) return;
  currentPieceId    = id;
  currentMediaIndex = 0;

  const medium = [article.medium, article.dimensions, article.year].filter(Boolean).join(' · ');
  document.getElementById('modalTitle').textContent  = article.title;
  document.getElementById('modalMedium').textContent = medium;
  document.getElementById('modalPrice').textContent  = article.price;
  document.getElementById('modalDesc').textContent   = article.description;

  renderMainMedia(article, 0);
  renderThumbs(article);
  syncNavButtons(article);

  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closePiece(e) {
  if (e && e.target !== e.currentTarget) return;
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; document.body.style.overflow = ''; }, 350);
}

function navigateMedia(delta) {
  const article = galleryData[currentPieceId];
  if (!article) return;
  const next = Math.max(0, Math.min(article._media.length - 1, currentMediaIndex + delta));
  if (next !== currentMediaIndex) renderMainMedia(article, next);
}

function syncNavButtons(article) {
  const prev  = document.getElementById('modalPrev');
  const next  = document.getElementById('modalNext');
  const multi = article._media.length > 1;
  prev.classList.toggle('visible', multi);
  next.classList.toggle('visible', multi);
  prev.disabled = currentMediaIndex === 0;
  next.disabled = currentMediaIndex === article._media.length - 1;
}

// Arrow-key and ESC navigation
document.addEventListener('keydown', e => {
  const open = document.getElementById('modalOverlay').classList.contains('open');
  if (e.key === 'Escape')      closePiece();
  if (!open) return;
  if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateMedia(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); navigateMedia(1);  }
});

// Touch swipe
let _swipeX = 0, _swipeY = 0;
const overlay = document.getElementById('modalOverlay');
overlay.addEventListener('touchstart', e => {
  _swipeX = e.touches[0].clientX;
  _swipeY = e.touches[0].clientY;
}, { passive: true });
overlay.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - _swipeX;
  const dy = e.changedTouches[0].clientY - _swipeY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) navigateMedia(dx < 0 ? 1 : -1);
}, { passive: true });

// Wire prev/next buttons
document.getElementById('modalPrev').addEventListener('click', () => navigateMedia(-1));
document.getElementById('modalNext').addEventListener('click', () => navigateMedia(1));

function renderMainMedia(article, index) {
  const mediaEl = document.getElementById('modalMedia');
  const item    = article._media[index];
  currentMediaIndex = index;

  document.querySelectorAll('.modal-thumb').forEach((t, i) => t.classList.toggle('active', i === index));

  // Keep nav buttons in sync as user moves through media
  syncNavButtons(article);

  if (item.type === 'video') {
    if (item.src && /^https?:\/\//.test(item.src)) {
      mediaEl.innerHTML = `<iframe src="${item.src}?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else {
      mediaEl.innerHTML = `<video src="${item.src}" controls autoplay playsinline></video>`;
    }
  } else if (item.src) {
    mediaEl.innerHTML = `<img class="main-img" src="${item.src}" alt="${article.title} — ${item.label}" />`;
  } else {
    mediaEl.innerHTML = `<div class="main-img-placeholder" style="background:${item.color}"></div>`;
  }
}

function renderThumbs(article) {
  const thumbsEl = document.getElementById('modalThumbs');
  thumbsEl.innerHTML = '';
  article._media.forEach((item, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
    thumb.title     = item.label || '';
    thumb.addEventListener('click', () => renderMainMedia(article, i));

    if (item.type === 'video') {
      thumb.innerHTML = `<div class="modal-thumb-inner modal-thumb-video">&#x25B6;</div>`;
    } else if (item.src) {
      thumb.innerHTML = `<img class="modal-thumb-inner" src="${item.src}" alt="${item.label}" style="object-fit:contain;width:100%;height:100%" />`;
    } else {
      thumb.innerHTML = `<div class="modal-thumb-inner" style="background:${item.thumbColor || item.color}"></div>`;
    }
    thumbsEl.appendChild(thumb);
  });
}

window.openPiece  = openPiece;
window.closePiece = closePiece;

loadGallery();
