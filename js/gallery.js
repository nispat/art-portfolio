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
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.piece').forEach(p => {
      const cat = p.dataset.category;
      const show = filter === 'all' || cat === filter;
      p.style.display = show ? '' : 'none';
      if (show) {
        p.style.animation = 'none';
        p.offsetHeight; // reflow
        p.style.animation = '';
      }
    });
  });
});

// ---------- MODAL ----------
let currentPieceId = null;
let currentMediaIndex = 0;

function openPiece(id) {
  if (!pieces || !pieces[id]) return;
  currentPieceId = id;
  currentMediaIndex = 0;

  const piece = pieces[id];
  document.getElementById('modalTitle').textContent  = piece.title;
  document.getElementById('modalMedium').textContent = piece.medium;
  document.getElementById('modalPrice').textContent  = piece.price;
  document.getElementById('modalDesc').textContent   = piece.description;

  renderMainMedia(piece, 0);
  renderThumbs(piece);

  const overlay = document.getElementById('modalOverlay');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closePiece(e) {
  if (e && e.target !== e.currentTarget) return; // only close on overlay click
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 350);
}

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePiece();
});

function renderMainMedia(piece, index) {
  const mediaEl  = document.getElementById('modalMedia');
  const item     = piece.media[index];
  currentMediaIndex = index;

  // Update active thumb
  document.querySelectorAll('.modal-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });

  if (item.type === 'video') {
    mediaEl.innerHTML = `<iframe
      src="${item.src}?autoplay=1&rel=0"
      allow="autoplay; fullscreen"
      allowfullscreen
    ></iframe>`;
  } else {
    if (item.src) {
      mediaEl.innerHTML = `<img class="main-img" src="${item.src}" alt="${piece.title} — ${item.label || ''}" />`;
    } else {
      // Placeholder colour block
      mediaEl.innerHTML = `<div class="main-img-placeholder" style="background:${item.color};"></div>`;
    }
  }
}

function renderThumbs(piece) {
  const thumbsEl = document.getElementById('modalThumbs');
  thumbsEl.innerHTML = '';
  piece.media.forEach((item, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
    thumb.title = item.label || '';
    thumb.addEventListener('click', () => renderMainMedia(piece, i));

    if (item.type === 'video') {
      thumb.innerHTML = `<div class="modal-thumb-inner modal-thumb-video">▶</div>`;
    } else if (item.src) {
      thumb.innerHTML = `<img class="modal-thumb-inner" src="${item.src}" alt="${item.label || ''}" style="object-fit:cover;width:100%;height:100%;" />`;
    } else {
      thumb.innerHTML = `<div class="modal-thumb-inner" style="background:${item.thumbColor || item.color};"></div>`;
    }

    thumbsEl.appendChild(thumb);
  });
}

// Expose globally
window.openPiece  = openPiece;
window.closePiece = closePiece;
