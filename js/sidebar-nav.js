/* ============================================================
   REAP AI PLATFORM — KYB Review Copilot
   sidebar-nav.js — Stripe-docs style full-TOC sidebar
   ============================================================ */
(function () {
  'use strict';

  /* ── Full site table of contents ─────────────────────────── */
  const TOC = [
    { num: 1, color: '#2563EB', label: 'Executive Framing', sections: [
      { id: '1.1', title: 'Problem Statement',      file: 'problem-context.html' },
      { id: '1.2', title: 'Market Opportunity',     file: 'opportunity-sizing.html' },
      { id: '1.3', title: 'Success Criteria',       file: 'success-criteria.html' },
      { id: '1.4', title: 'Executive Summary',      file: 'executive-summary.html' },
    ]},
    { num: 2, color: '#7C3AED', label: 'Users & Workflow', sections: [
      { id: '2.1', title: 'User Personas',          file: 'user-personas.html' },
      { id: '2.2', title: 'Reviewer Workflow',      file: 'reviewer-workflow.html' },
    ]},
    { num: 3, color: '#059669', label: 'Product Scope', sections: [
      { id: '3.1', title: 'Feature Scope',          file: 'feature-scope.html' },
      { id: '3.2', title: 'Out of Scope',           file: 'out-of-scope.html' },
      { id: '3.3', title: 'Build vs Buy',           file: 'build-vs-buy.html' },
      { id: '3.4', title: 'Phased Delivery',        file: 'phased-delivery.html' },
      { id: '3.5', title: 'Dependencies',           file: 'dependencies.html' },
      { id: '3.6', title: 'Assumptions',            file: 'assumptions.html' },
    ]},
    { num: 4, color: '#D97706', label: 'Platform Components', sections: [
      { id: '4.1', title: 'RAG Architecture',       file: 'rag-overview.html' },
      { id: '4.2', title: 'Ingestion Pipeline',     file: 'ingestion-pipeline.html' },
      { id: '4.3', title: 'Document Intelligence',  file: 'retrieval-policy.html' },
      { id: '4.4', title: 'Knowledge & Retrieval',  file: 'llm-reasoning.html' },
      { id: '4.5', title: 'Reviewer Assist',        file: 'reviewer-assist.html' },
      { id: '4.6', title: 'Workflow Orchestration', file: 'workflow-orchestration.html' },
      { id: '4.7', title: 'Confidence Scoring',     file: 'confidence-scoring.html' },
    ]},
    { num: 5, color: '#0891B2', label: 'Trust & Governance', sections: [
      { id: '5.1', title: 'Control Framework',      file: 'control-framework.html' },
      { id: '5.2', title: 'HITL & Fallback',        file: 'hitl-fallback.html' },
      { id: '5.3', title: 'Audit & Logging',        file: 'audit-logging.html' },
      { id: '5.4', title: 'Compliance',             file: 'compliance.html' },
      { id: '5.5', title: 'Risk Framework',         file: 'risk-framework.html' },
      { id: '5.6', title: 'Data Privacy',           file: 'data-privacy.html' },
    ]},
    { num: 6, color: '#DC2626', label: 'Platform & Integration', sections: [
      { id: '6.1', title: 'Platform Integration',   file: 'platform-integration.html' },
    ]},
    { num: 7, color: '#4F46E5', label: 'Solution Architecture', sections: [
      { id: '7.1', title: 'E2E Architecture',       file: 'solution-architecture.html' },
      { id: '7.2', title: 'Data Model',             file: 'data-model.html' },
      { id: '7.3', title: 'API Design',             file: 'api-design.html' },
      { id: '7.4', title: 'Infrastructure',         file: 'infrastructure.html' },
      { id: '7.5', title: 'Security Architecture',  file: 'security-design.html' },
      { id: '7.6', title: 'Workflow State Model',   file: 'workflow-state.html' },
    ]},
    { num: 8, color: '#DB2777', label: 'Delivery Strategy', sections: [
      { id: '8.1', title: 'Platform Reuse Map',     file: 'platform-reuse.html' },
      { id: '8.2', title: 'Go-to-Market',           file: 'go-to-market.html' },
      { id: '8.3', title: 'Team & Resourcing',      file: 'team-resourcing.html' },
      { id: '8.4', title: 'Dependency Map',         file: 'dependency-map.html' },
      { id: '8.5', title: 'Open Questions',         file: 'open-questions.html' },
    ]},
    { num: 9, color: '#0D9488', label: 'Measurement', sections: [
      { id: '9.1', title: 'Metrics Framework',      file: 'metrics-framework.html' },
      { id: '9.2', title: 'Experimentation',        file: 'experimentation.html' },
      { id: '9.3', title: 'Monitoring & Alerting',  file: 'monitoring.html' },
    ]},
  ];

  /* ── Helpers ─────────────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const currentFile = window.location.pathname.split('/').pop() || '';

  /* ── Build sidebar HTML ──────────────────────────────────── */
  function buildSidebarHTML() {
    const parts = [];

    parts.push(`
      <a href="../index.html" class="snav-home">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        All Sections
      </a>
      <div class="snav-doc-label">KYB Review Copilot — PRD</div>
    `);

    for (const block of TOC) {
      const isActiveBlock = block.sections.some(s => s.file === currentFile);

      parts.push(`
        <div class="snav-group${isActiveBlock ? ' snav-group--open' : ''}">
          <button class="snav-group-hdr" aria-expanded="${isActiveBlock}" data-snav-toggle>
            <span class="snav-dot" style="background:${block.color}"></span>
            <span class="snav-block-meta">
              <span class="snav-block-num">Block ${block.num}</span>
              <span class="snav-block-name">${esc(block.label)}</span>
            </span>
            <svg class="snav-chev" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul class="snav-list">
      `);

      for (const sec of block.sections) {
        const isCurrent = sec.file === currentFile;
        parts.push(`
          <li class="snav-li${isCurrent ? ' snav-li--cur' : ''}"
              ${isCurrent ? `style="--ac:${block.color}"` : ''}>
            <a href="${esc(sec.file)}" class="snav-a">
              <span class="snav-secnum">${esc(sec.id)}</span>
              <span class="snav-sectitle">${esc(sec.title)}</span>
            </a>
            ${isCurrent ? '<ul class="snav-pagetoc" id="snav-pagetoc"></ul>' : ''}
          </li>
        `);
      }

      parts.push(`</ul></div>`);
    }

    return parts.join('');
  }

  /* ── Build in-page anchor TOC ────────────────────────────── */
  function buildPageTOC() {
    const tocEl = document.getElementById('snav-pagetoc');
    if (!tocEl) return;

    const content = document.querySelector('.content');
    if (!content) return;

    const seen  = new Set();
    const items = [];

    // Gather h2[id], h3[id], and named section dividers
    content.querySelectorAll(
      'h2[id], h3[id], ' +
      '[id][class*="section-label"], ' +
      '[id][class*="persona-section"], ' +
      '[id][class*="sc-section"], ' +
      '[id][class*="ds-section"]'
    ).forEach(el => {
      if (seen.has(el.id)) return;
      seen.add(el.id);
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (text.length < 3 || text.length > 72) return;
      items.push({
        id:  el.id,
        text,
        sub: el.tagName === 'H3',
      });
    });

    if (items.length === 0) return;

    tocEl.innerHTML = items
      .map(i => `<li>
        <a href="#${i.id}" class="snav-toca${i.sub ? ' snav-toca--sub' : ''}">
          ${esc(i.text)}
        </a></li>`)
      .join('');

    /* Scroll spy via IntersectionObserver */
    const links     = tocEl.querySelectorAll('.snav-toca');
    const headingEls = items.map(i => document.getElementById(i.id)).filter(Boolean);
    let activeId    = null;

    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        if (id === activeId) return;
        activeId = id;
        links.forEach(l =>
          l.classList.toggle('snav-toca--on', l.getAttribute('href') === '#' + id)
        );
      });
    }, { rootMargin: '-8% 0% -76% 0%', threshold: 0 });

    headingEls.forEach(el => spy.observe(el));

    /* Smooth-scroll anchor clicks */
    tocEl.addEventListener('click', e => {
      const a = e.target.closest('.snav-toca');
      if (!a) return;
      const id     = (a.getAttribute('href') || '').slice(1);
      const target = id && document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;

    /* Render */
    sidebar.innerHTML = buildSidebarHTML();

    /* Expand/collapse toggles */
    sidebar.querySelectorAll('[data-snav-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.snav-group');
        const open  = group.classList.toggle('snav-group--open');
        btn.setAttribute('aria-expanded', open);
      });
    });

    /* In-page TOC */
    buildPageTOC();

    /* Scroll active item into sidebar view */
    const active = sidebar.querySelector('.snav-li--cur');
    if (active) {
      setTimeout(() => active.scrollIntoView({ block: 'nearest', behavior: 'instant' }), 60);
    }
  });

})();
