/* ============================================================
   REAP AI PLATFORM — KYB Review Copilot
   main.js — Mermaid init + interactions
   ============================================================ */

// ── Mermaid initialisation ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor:       '#635BFF',
        primaryTextColor:   '#1A1F36',
        primaryBorderColor: '#C8D0DB',
        lineColor:          '#697386',
        secondaryColor:     '#EFF6FF',
        tertiaryColor:      '#F6F9FC',
        background:         '#FFFFFF',
        mainBkg:            '#FFFFFF',
        nodeBorder:         '#C8D0DB',
        clusterBkg:         '#F6F9FC',
        titleColor:         '#1A1F36',
        edgeLabelBackground:'#F6F9FC',
        fontFamily:         'Inter, sans-serif',
        fontSize:           '14px',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        padding: 16,
      },
      sequence: {
        diagramMarginX: 20,
        diagramMarginY: 20,
        actorMargin: 80,
        noteMargin: 15,
        messageMargin: 40,
      },
    });
  }

  // ── Active sidebar link ───────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // ── Smooth-scroll for on-page anchors ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Section reading progress bar ─────────────────────────
  if (document.querySelector('.content')) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position:fixed; top:60px; left:0; height:2px; width:0%;
      background: linear-gradient(90deg,#635BFF,#A5B4FC);
      z-index:200; transition:width .1s linear; pointer-events:none;
    `;
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ── Image lightbox (for <img> blocks) ────────────────────
  const lightbox = document.createElement('div');
  lightbox.className = 'img-lightbox';
  lightbox.innerHTML = `
    <div class="img-lightbox-inner">
      <img id="lightbox-img" src="" alt="" />
      <div class="img-lightbox-bar">
        <span class="img-lightbox-caption" id="lightbox-caption"></span>
        <button class="img-lightbox-close" id="lightbox-close" title="Close">&#x2715;</button>
      </div>
    </div>`;
  document.body.appendChild(lightbox);

  const lbImg     = lightbox.querySelector('#lightbox-img');
  const lbCaption = lightbox.querySelector('#lightbox-caption');

  function openLightbox(src, caption) {
    lbImg.src = src;
    lbCaption.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightbox.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.querySelectorAll('.img-btn-expand').forEach(btn => {
    btn.addEventListener('click', () => openLightbox(btn.dataset.img, btn.dataset.caption || ''));
  });
  document.querySelectorAll('.img-frame img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  // ============================================================
  // MERMAID DIAGRAM — SVG trim + expand modal
  // ============================================================

  // -- Trim SVG whitespace by resetting viewBox to content bbox
  function trimSVG(svg) {
    try {
      const bbox = svg.getBBox();
      if (bbox.width > 0 && bbox.height > 0) {
        const pad = 20;
        svg.setAttribute('viewBox',
          `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`
        );
        svg.removeAttribute('height');
        svg.style.width  = '100%';
        svg.style.height = 'auto';
        svg.style.display = 'block';
      }
    } catch (e) { /* svg not visible yet */ }
  }

  // -- Build & mount the diagram modal ─────────────────────
  const modal = document.createElement('div');
  modal.id = 'diag-modal';
  modal.className = 'diag-modal';
  modal.innerHTML = `
    <div class="diag-modal-bar">
      <span class="diag-modal-title" id="diag-modal-title"></span>
      <div class="diag-modal-ctrl-group">
        <button class="diag-modal-btn icon-only" id="diag-zoom-out" title="Zoom out">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 6h4M11 11l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <span class="diag-zoom-level" id="diag-zoom-level">100%</span>
        <button class="diag-modal-btn icon-only" id="diag-zoom-in" title="Zoom in">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 4v4M4 6h4M11 11l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="diag-modal-btn" id="diag-zoom-reset" title="Reset zoom">Reset</button>
        <div class="diag-modal-sep"></div>
        <button class="diag-modal-btn" id="diag-download" title="Download SVG">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1 10.5h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download
        </button>
        <button class="diag-modal-btn" id="diag-share" title="Copy link to clipboard">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M5 7.5a3 3 0 004.24.07l2-2a3 3 0 00-4.24-4.24l-1.14 1.13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 5.5a3 3 0 00-4.24-.07l-2 2a3 3 0 004.24 4.24l1.13-1.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Share
        </button>
        <div class="diag-modal-sep"></div>
        <button class="diag-modal-btn icon-only" id="diag-close" title="Close (Esc)">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="diag-modal-viewport" id="diag-modal-viewport">
      <div class="diag-modal-canvas" id="diag-modal-canvas"></div>
    </div>`;
  document.body.appendChild(modal);

  const modalTitle    = modal.querySelector('#diag-modal-title');
  const modalCanvas   = modal.querySelector('#diag-modal-canvas');
  const modalViewport = modal.querySelector('#diag-modal-viewport');
  const zoomDisplay   = modal.querySelector('#diag-zoom-level');

  // Toast
  const toast = document.createElement('div');
  toast.className = 'diag-toast';
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // Zoom / pan state
  let scale = 1, panX = 0, panY = 0;
  let isDragging = false, lastMouseX = 0, lastMouseY = 0;
  let currentSVGEl = null;

  function applyTransform(animated) {
    modalCanvas.style.transition = animated ? 'transform .18s ease' : 'none';
    modalCanvas.style.transform =
      `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${scale})`;
    zoomDisplay.textContent = Math.round(scale * 100) + '%';
  }

  function setScale(newScale, animated) {
    scale = Math.min(8, Math.max(0.15, newScale));
    applyTransform(animated);
  }

  function resetView(animated) {
    scale = 1; panX = 0; panY = 0;
    applyTransform(animated);
  }

  modal.querySelector('#diag-zoom-in').addEventListener('click',    () => setScale(scale * 1.25, true));
  modal.querySelector('#diag-zoom-out').addEventListener('click',   () => setScale(scale / 1.25, true));
  modal.querySelector('#diag-zoom-reset').addEventListener('click', () => resetView(true));

  // Mouse wheel zoom
  modalViewport.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(scale * delta, false);
  }, { passive: false });

  // Drag to pan
  modalViewport.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    modalViewport.classList.add('grabbing');
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    panX += e.clientX - lastMouseX;
    panY += e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    applyTransform(false);
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    modalViewport.classList.remove('grabbing');
  });

  // Touch pan/pinch
  let lastTouches = null;
  modalViewport.addEventListener('touchstart', e => {
    lastTouches = e.touches;
  }, { passive: true });
  modalViewport.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouches?.length === 1) {
      panX += e.touches[0].clientX - lastTouches[0].clientX;
      panY += e.touches[0].clientY - lastTouches[0].clientY;
      applyTransform(false);
    } else if (e.touches.length === 2 && lastTouches?.length === 2) {
      const prevDist = Math.hypot(
        lastTouches[0].clientX - lastTouches[1].clientX,
        lastTouches[0].clientY - lastTouches[1].clientY
      );
      const currDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setScale(scale * (currDist / prevDist), false);
    }
    lastTouches = e.touches;
  }, { passive: false });

  // Download SVG
  modal.querySelector('#diag-download').addEventListener('click', () => {
    if (!currentSVGEl) return;
    const clone = currentSVGEl.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // Inline any <style> tags Mermaid added in the parent document
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const name = (modalTitle.textContent || 'diagram').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    a.href = url; a.download = `reap-kyb-${name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('SVG downloaded');
  });

  // Share — copy page URL
  modal.querySelector('#diag-share').addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Link copied to clipboard'))
      .catch(() => showToast('Could not copy — copy the URL manually'));
  });

  // Open modal
  function openDiagramModal(mermaidEl, title) {
    const svg = mermaidEl.querySelector('svg');
    if (!svg) return;
    currentSVGEl = svg;

    modalTitle.textContent = title || '';
    modalCanvas.innerHTML = '';
    const clone = svg.cloneNode(true);
    clone.removeAttribute('width');
    clone.style.width  = 'auto';
    clone.style.height = 'auto';
    clone.style.maxWidth = 'none';
    // Give it a reasonable base size for the modal
    const vb = svg.getAttribute('viewBox');
    if (vb) {
      const parts = vb.split(/[\s,]+/).map(Number);
      if (parts.length === 4) {
        clone.style.width  = parts[2] + 'px';
        clone.style.height = parts[3] + 'px';
      }
    }
    modalCanvas.appendChild(clone);
    resetView(false);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modalCanvas.innerHTML = '';
    currentSVGEl = null;
  }
  modal.querySelector('#diag-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal || e.target === modalViewport) {} }); // don't close on viewport click — need drag

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('open')) { closeModal(); return; }
      closeLightbox();
    }
    if (modal.classList.contains('open')) {
      if (e.key === '+' || e.key === '=') setScale(scale * 1.2, true);
      if (e.key === '-')                   setScale(scale / 1.2, true);
      if (e.key === '0')                   resetView(true);
    }
  });

  // -- Post-process Mermaid SVGs after render ──────────────
  function postProcessDiagrams() {
    document.querySelectorAll('.diagram-section').forEach(section => {
      const label    = section.querySelector('.diagram-label');
      const mermaidEl = section.querySelector('.mermaid');
      if (!mermaidEl) return;

      const svg = mermaidEl.querySelector('svg');
      if (svg) trimSVG(svg);

      // Inject expand button only once
      if (label && !label.querySelector('.diagram-label-controls')) {
        const title = label.querySelector('h3')?.textContent?.trim() || 'Diagram';
        const controls = document.createElement('div');
        controls.className = 'diagram-label-controls';
        controls.innerHTML = `
          <button class="diag-expand-btn" aria-label="Expand diagram">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8 1h4v4M1 8v4h4M12 1L7.5 5.5M1 12l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Expand
          </button>`;
        label.appendChild(controls);
        controls.querySelector('.diag-expand-btn').addEventListener('click', () => {
          openDiagramModal(mermaidEl, title);
        });
      }
    });
  }

  // Watch for Mermaid rendering (it's async)
  const mermaidDivs = document.querySelectorAll('.mermaid');
  if (mermaidDivs.length === 0) return;

  let processed = false;
  const obs = new MutationObserver(() => {
    // Check if any mermaid div now has an SVG child
    const allReady = [...mermaidDivs].every(el => el.querySelector('svg'));
    if (allReady && !processed) {
      processed = true;
      obs.disconnect();
      // Small rAF delay to let Mermaid finish layout
      requestAnimationFrame(() => setTimeout(postProcessDiagrams, 80));
    }
  });
  mermaidDivs.forEach(el => obs.observe(el, { childList: true, subtree: true }));

  // Fallback: also try after a safe timeout
  setTimeout(() => {
    if (!processed) {
      processed = true;
      obs.disconnect();
      postProcessDiagrams();
    }
  }, 2000);
});
