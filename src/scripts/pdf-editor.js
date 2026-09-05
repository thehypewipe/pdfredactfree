/**
 * pdf-editor.js — 100% Client-Side PDF Blackout Engine
 * Built with pdfjs-dist and pdf-lib with native Vite ?url worker bundling
 * Zero server uploads. All processing in browser memory.
 */

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { PDFDocument, rgb } from 'pdf-lib';

// Configure the worker URL bundled directly by Vite with fallback to local public worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker || '/pdf.worker.min.mjs';
} catch (e) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

console.log('[PDF Blackout] Worker configured with URL:', pdfjsLib.GlobalWorkerOptions.workerSrc);

// ─── State ─────────────────────────────────────────────────────────────────────
let pdfDoc = null;         // pdfjs document proxy
let pdfBytes = null;       // original ArrayBuffer
let currentPage = 1;
let totalPages = 0;
let scale = 1.5;
let tool = 'blackout';     // 'blackout' | 'edit'
let isDark = false;
let currentRenderTask = null;

// Redactions format:
// { page: number, x: number, y: number, w: number, h: number, canvasW: number, canvasH: number }
let redactions = [];
let history = [[]];        // snapshots
let historyIndex = 0;

// Drawing & Edit state
let isDrawing = false;
let startX = 0, startY = 0;
let selectedIdx = -1;      // index in redactions for edit mode
let resizing = false;
let resizeHandle = '';
let dragStartX = 0, dragStartY = 0;
let origRect = null;

// DOM references
let dropzone, fileInput, dropzoneWrap, editorWrap;
let mainCanvas, overlayCanvas, thumbnailList;
let ctx, octx;
let zoomDisplay, downloadBtn, undoBtn, redoBtn, pageCountBadge;
let toolBlackout, toolEdit;
let errorBanner, errorText, errorClose, loadingOverlay, loadingText;

// ─── UI Helper Functions ───────────────────────────────────────────────────────
function showError(msg) {
  if (errorText) errorText.textContent = msg;
  if (errorBanner) errorBanner.classList.remove('hidden');
  hideLoading();
}

function hideError() {
  if (errorBanner) errorBanner.classList.add('hidden');
}

function showLoading(msg = 'Loading PDF into browser memory...') {
  if (loadingText) loadingText.textContent = msg;
  if (loadingOverlay) loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
  if (loadingOverlay) loadingOverlay.classList.add('hidden');
}

// ─── Initialization ────────────────────────────────────────────────────────────
function initPdfTool() {
  // Cache DOM elements
  dropzoneWrap   = document.getElementById('pdf-dropzone-wrap');
  dropzone       = document.getElementById('pdf-dropzone');
  fileInput      = document.getElementById('pdf-upload-input') || document.getElementById('pdf-file-input');
  editorWrap     = document.getElementById('pdf-editor-wrap');
  mainCanvas     = document.getElementById('pdf-main-canvas');
  overlayCanvas  = document.getElementById('pdf-overlay-canvas');
  thumbnailList  = document.getElementById('pdf-thumbnail-list');
  pageCountBadge = document.getElementById('page-count-badge');
  zoomDisplay    = document.getElementById('zoom-display');
  downloadBtn    = document.getElementById('btn-download');
  undoBtn        = document.getElementById('btn-undo');
  redoBtn        = document.getElementById('btn-redo');
  toolBlackout   = document.getElementById('tool-blackout');
  toolEdit       = document.getElementById('tool-edit');
  errorBanner    = document.getElementById('pdf-error-banner');
  errorText      = document.getElementById('pdf-error-text');
  errorClose     = document.getElementById('pdf-error-close');
  loadingOverlay = document.getElementById('pdf-loading-overlay');
  loadingText    = document.getElementById('pdf-loading-text');

  if (!fileInput || !mainCanvas || !overlayCanvas) {
    return;
  }

  ctx  = mainCanvas.getContext('2d');
  octx = overlayCanvas.getContext('2d');

  // Error Banner Close
  errorClose?.addEventListener('click', hideError);

  // ── 1. Native File Input change event ──
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  });

  // ── 2. Drag and Drop Events on Dropzone ──
  if (dropzone) {
    ['dragenter', 'dragover'].forEach((name) => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach((name) => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', async (e) => {
      const dt = e.dataTransfer;
      const file = dt?.files?.[0];
      if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
        await handleFile(file);
      }
    });
  }

  // "Open Another PDF" button in toolbar
  document.getElementById('btn-new-file')?.addEventListener('click', () => {
    if (fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
  });

  // ── Mouse & Pointer Canvas Events ──
  overlayCanvas.addEventListener('mousedown', onMouseDown);
  overlayCanvas.addEventListener('mousemove', onMouseMove);
  overlayCanvas.addEventListener('mouseup', onMouseUp);
  overlayCanvas.addEventListener('mouseleave', onMouseUp);

  // ── Mobile Touch Support (iPhone, iPad, Android) ──
  overlayCanvas.addEventListener('touchstart', onTouchStart, { passive: false });
  overlayCanvas.addEventListener('touchmove', onTouchMove, { passive: false });
  overlayCanvas.addEventListener('touchend', onTouchEnd, { passive: false });
  overlayCanvas.addEventListener('touchcancel', onTouchEnd, { passive: false });

  // ── Toolbar Handlers ──
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => zoom(0.15));
  document.getElementById('btn-zoom-out')?.addEventListener('click', () => zoom(-0.15));
  document.getElementById('btn-fullscreen')?.addEventListener('click', toggleFullscreen);
  document.getElementById('btn-dark')?.addEventListener('click', toggleDark);
  downloadBtn?.addEventListener('click', exportRedactedPdf);
  undoBtn?.addEventListener('click', undo);
  redoBtn?.addEventListener('click', redo);

  toolBlackout?.addEventListener('click', () => setTool('blackout'));
  toolEdit?.addEventListener('click', () => setTool('edit'));

  // ── Global Keyboard Shortcuts ──
  document.addEventListener('keydown', onKeyDown);

  // Restore dark theme preference if saved
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    isDark = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  updateToolbarState();
}

// ─── File Handling & Document Parsing ──────────────────────────────────────────
async function handleFile(file) {
  if (!file) return;

  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    showError('Please select a valid PDF document (.pdf).');
    return;
  }

  hideError();
  showLoading('Reading PDF into browser memory...');

  try {
    const arrayBuffer = await file.arrayBuffer();
    console.log('[PDF Blackout] PDF file loaded into memory, byte length:', arrayBuffer.byteLength);

    if (arrayBuffer.byteLength === 0) {
      throw new Error('Selected PDF file is empty (0 bytes).');
    }

    // Keep an immutable slice for pdf-lib export
    pdfBytes = arrayBuffer.slice(0);

    // Format safe buffer for pdfjs
    const pdfData = new Uint8Array(arrayBuffer);

    showLoading('Rendering document...');
    const loadingTask = pdfjsLib.getDocument({
      data: pdfData,
      cMapUrl: '/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: '/standard_fonts/',
      useSystemFonts: true,
    });

    loadingTask.onPassword = (callback, reason) => {
      console.warn('[PDF Blackout] Document requires password. Reason code:', reason);
      showError('This PDF is password-protected. Please remove the password and try again.');
    };

    pdfDoc = await loadingTask.promise;
    totalPages = pdfDoc.numPages;
    currentPage = 1;
    redactions = [];
    history = [[]];
    historyIndex = 0;

    console.log('[PDF Blackout] Document parsed successfully. Total pages:', totalPages);

    if (pageCountBadge) pageCountBadge.textContent = String(totalPages);

    // UI Transition: Hide dropzone, Show editor
    if (dropzoneWrap) dropzoneWrap.classList.add('hidden');
    if (editorWrap) editorWrap.classList.remove('hidden');

    // Auto-fit scale for mobile screens
    if (window.innerWidth < 640) {
      scale = 1.0;
    } else if (window.innerWidth < 1024) {
      scale = 1.25;
    } else {
      scale = 1.5;
    }

    // Render Page 1 and build thumbnails
    await renderPage(currentPage);
    buildThumbnails();
    hideLoading();
    updateToolbarState();
  } catch (err) {
    console.error('[PDF Blackout] PDF Render Error Details:', err);
    if (err?.name === 'PasswordException') {
      showError('This PDF is password-protected. Please remove the password and try again.');
    } else if (err?.name === 'InvalidPDFException') {
      showError('This file does not appear to be a valid PDF document.');
    } else {
      showError('Could not render this PDF. Please ensure it is a valid, unencrypted PDF document.');
    }
  }
}

// ─── Page Rendering ────────────────────────────────────────────────────
async function renderPage(pageNum) {
  if (!pdfDoc || !mainCanvas) return;

  if (currentRenderTask) {
    try {
      currentRenderTask.cancel();
    } catch (e) {}
    currentRenderTask = null;
  }

  try {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Set canvas dimensions
    mainCanvas.width  = viewport.width;
    mainCanvas.height = viewport.height;
    overlayCanvas.width  = viewport.width;
    overlayCanvas.height = viewport.height;

    // Explicit style pixel sizes prevent CSS stretching artifacts
    mainCanvas.style.width  = `${viewport.width}px`;
    mainCanvas.style.height = `${viewport.height}px`;
    overlayCanvas.style.width  = `${viewport.width}px`;
    overlayCanvas.style.height = `${viewport.height}px`;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    currentRenderTask = page.render(renderContext);
    await currentRenderTask.promise;
    currentRenderTask = null;

    drawRedactions();
  } catch (err) {
    if (err?.name !== 'RenderingCancelledException') {
      console.error('[PDF Blackout] Page render error:', err);
    }
  }
}

// ─── Thumbnails Navigation ─────────────────────────────────────────────────────
async function buildThumbnails() {
  if (!thumbnailList || !pdfDoc) return;
  thumbnailList.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    try {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 0.18 });
      const canvas = document.createElement('canvas');
      canvas.width  = viewport.width;
      canvas.height = viewport.height;
      const thumbCtx = canvas.getContext('2d');
      await page.render({ canvasContext: thumbCtx, viewport }).promise;

      const li = document.createElement('li');
      li.className = 'thumbnail-item';
      li.setAttribute('data-page', String(i));
      li.setAttribute('tabindex', '0');
      li.setAttribute('aria-label', `Page ${i}`);
      li.appendChild(canvas);

      const label = document.createElement('span');
      label.textContent = `Page ${i}`;
      li.appendChild(label);

      li.addEventListener('click', () => goToPage(i));
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToPage(i);
        }
      });

      thumbnailList.appendChild(li);
    } catch (e) {
      console.warn(`[PDF Blackout] Thumbnail error for page ${i}:`, e);
    }
  }
  highlightThumbnail();
}

function highlightThumbnail() {
  if (!thumbnailList) return;
  thumbnailList.querySelectorAll('.thumbnail-item').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.page) === currentPage);
  });
}

async function goToPage(n) {
  if (!pdfDoc || n < 1 || n > totalPages || n === currentPage) return;
  currentPage = n;
  selectedIdx = -1;
  highlightThumbnail();
  await renderPage(currentPage);
}

// ─── Redactions Layer & Drawing ────────────────────────────────────────────────
function getScaledRect(r) {
  if (!overlayCanvas) return r;
  const currentW = overlayCanvas.width;
  const currentH = overlayCanvas.height;
  const scaleX = currentW / r.canvasW;
  const scaleY = currentH / r.canvasH;
  return {
    x: r.x * scaleX,
    y: r.y * scaleY,
    w: r.w * scaleX,
    h: r.h * scaleY,
  };
}

function drawRedactions(previewRect) {
  if (!octx || !overlayCanvas) return;
  octx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  // Render committed redactions for current page
  redactions.forEach((r, idx) => {
    if (r.page !== currentPage) return;
    const rect = getScaledRect(r);

    // Solid opaque black rectangle
    octx.fillStyle = '#000000';
    octx.fillRect(rect.x, rect.y, rect.w, rect.h);

    // Selected highlight in Edit mode
    if (tool === 'edit' && idx === selectedIdx) {
      octx.strokeStyle = '#0070f3';
      octx.lineWidth = 2;
      octx.strokeRect(rect.x - 1, rect.y - 1, rect.w + 2, rect.h + 2);
      drawHandles(rect);
    }
  });

  // Live preview box while user is dragging
  if (previewRect) {
    octx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    octx.fillRect(previewRect.x, previewRect.y, previewRect.w, previewRect.h);
    octx.strokeStyle = '#0070f3';
    octx.lineWidth = 1.5;
    octx.strokeRect(previewRect.x, previewRect.y, previewRect.w, previewRect.h);
  }
}

// ─── Edit Mode Resize Handles ──────────────────────────────────────────────────
const HANDLE_SIZE = 8;

function getHandleRects(r) {
  const hs = HANDLE_SIZE / 2;
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  return [
    { id: 'nw', x: r.x - hs,       y: r.y - hs       },
    { id: 'n',  x: cx - hs,        y: r.y - hs       },
    { id: 'ne', x: r.x + r.w - hs, y: r.y - hs       },
    { id: 'e',  x: r.x + r.w - hs, y: cy - hs        },
    { id: 'se', x: r.x + r.w - hs, y: r.y + r.h - hs },
    { id: 's',  x: cx - hs,        y: r.y + r.h - hs },
    { id: 'sw', x: r.x - hs,       y: r.y + r.h - hs },
    { id: 'w',  x: r.x - hs,       y: cy - hs        },
  ];
}

function drawHandles(r) {
  const handles = getHandleRects(r);
  handles.forEach(h => {
    octx.fillStyle = '#0070f3';
    octx.fillRect(h.x, h.y, HANDLE_SIZE, HANDLE_SIZE);
    octx.strokeStyle = '#ffffff';
    octx.lineWidth = 1.5;
    octx.strokeRect(h.x, h.y, HANDLE_SIZE, HANDLE_SIZE);
  });
}

function hitHandle(mx, my, r) {
  const handles = getHandleRects(r);
  for (const h of handles) {
    if (mx >= h.x && mx <= h.x + HANDLE_SIZE && my >= h.y && my <= h.y + HANDLE_SIZE) {
      return h.id;
    }
  }
  return null;
}

function hitRect(mx, my, r) {
  return mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h;
}

// ─── Mouse & Touch Coordinates Calculation ─────────────────────────────────────
function getCanvasPos(e) {
  const rect = overlayCanvas.getBoundingClientRect();
  let clientX = e.clientX;
  let clientY = e.clientY;

  // Support Touch events (e.touches or e.changedTouches for touchend)
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if (e.changedTouches && e.changedTouches.length > 0) {
    clientX = e.changedTouches[0].clientX;
    clientY = e.changedTouches[0].clientY;
  }

  return {
    x: (clientX - rect.left) * (overlayCanvas.width / rect.width),
    y: (clientY - rect.top)  * (overlayCanvas.height / rect.height),
  };
}

function onMouseDown(e) {
  if (e.button !== undefined && e.button !== 0) return; // Left-click only for mouse
  const { x, y } = getCanvasPos(e);

  if (tool === 'blackout') {
    isDrawing = true;
    startX = x;
    startY = y;
  } else if (tool === 'edit') {
    // Check resize handles on currently selected box
    if (selectedIdx >= 0 && redactions[selectedIdx]?.page === currentPage) {
      const scaled = getScaledRect(redactions[selectedIdx]);
      const handle = hitHandle(x, y, scaled);
      if (handle) {
        resizing = true;
        resizeHandle = handle;
        dragStartX = x;
        dragStartY = y;
        origRect = { ...scaled };
        return;
      }
    }

    // Hit test boxes from topmost to bottom
    selectedIdx = -1;
    for (let i = redactions.length - 1; i >= 0; i--) {
      const r = redactions[i];
      if (r.page === currentPage && hitRect(x, y, getScaledRect(r))) {
        selectedIdx = i;
        break;
      }
    }
    drawRedactions();
  }
}

function onMouseMove(e) {
  const { x, y } = getCanvasPos(e);

  if (tool === 'blackout' && isDrawing) {
    const rx = Math.min(startX, x);
    const ry = Math.min(startY, y);
    const rw = Math.abs(x - startX);
    const rh = Math.abs(y - startY);
    drawRedactions({ x: rx, y: ry, w: rw, h: rh });
  } else if (tool === 'edit' && resizing && selectedIdx >= 0) {
    const dx = x - dragStartX;
    const dy = y - dragStartY;
    const current = { ...origRect };
    applyResize(current, resizeHandle, dx, dy);

    // Save back with current canvas base dimensions
    redactions[selectedIdx] = {
      page: currentPage,
      x: current.x,
      y: current.y,
      w: current.w,
      h: current.h,
      canvasW: overlayCanvas.width,
      canvasH: overlayCanvas.height,
    };
    drawRedactions();
  } else if (tool === 'edit') {
    // Cursor hover update
    if (selectedIdx >= 0 && redactions[selectedIdx]?.page === currentPage) {
      const scaled = getScaledRect(redactions[selectedIdx]);
      const handle = hitHandle(x, y, scaled);
      if (handle) {
        overlayCanvas.style.cursor = getCursorForHandle(handle);
        return;
      }
    }
    const isOverBox = redactions.some(r => r.page === currentPage && hitRect(x, y, getScaledRect(r)));
    overlayCanvas.style.cursor = isOverBox ? 'pointer' : 'default';
  }
}

function onMouseUp(e) {
  const { x, y } = getCanvasPos(e);

  if (tool === 'blackout' && isDrawing) {
    isDrawing = false;
    const rw = Math.abs(x - startX);
    const rh = Math.abs(y - startY);
    const rx = Math.min(startX, x);
    const ry = Math.min(startY, y);

    if (rw >= 4 && rh >= 4) {
      pushRedaction({
        page: currentPage,
        x: rx,
        y: ry,
        w: rw,
        h: rh,
        canvasW: overlayCanvas.width,
        canvasH: overlayCanvas.height,
      });
    }
    drawRedactions();
  } else if (tool === 'edit' && resizing) {
    resizing = false;
    resizeHandle = '';
    pushHistory();
    drawRedactions();
  }
}

// ─── Touch Event Handlers ──────────────────────────────────────────────────────
function onTouchStart(e) {
  if (e.touches.length > 1) return;
  e.preventDefault();
  onMouseDown(e);
}

function onTouchMove(e) {
  if (e.touches.length > 1) return;
  e.preventDefault();
  onMouseMove(e);
}

function onTouchEnd(e) {
  e.preventDefault();
  onMouseUp(e);
}

function applyResize(r, handle, dx, dy) {
  const minSize = 8;
  if (handle.includes('e')) { r.w = Math.max(minSize, origRect.w + dx); }
  if (handle.includes('s')) { r.h = Math.max(minSize, origRect.h + dy); }
  if (handle.includes('w')) {
    const newW = Math.max(minSize, origRect.w - dx);
    r.x = origRect.x + (origRect.w - newW);
    r.w = newW;
  }
  if (handle.includes('n')) {
    const newH = Math.max(minSize, origRect.h - dy);
    r.y = origRect.y + (origRect.h - newH);
    r.h = newH;
  }
}

function getCursorForHandle(h) {
  const map = {
    nw: 'nw-resize', n: 'n-resize', ne: 'ne-resize', e: 'e-resize',
    se: 'se-resize', s: 's-resize', sw: 'sw-resize', w: 'w-resize',
  };
  return map[h] || 'pointer';
}

// ─── Tool Selection ────────────────────────────────────────────────────────────
function setTool(t) {
  tool = t;
  selectedIdx = -1;
  if (overlayCanvas) {
    overlayCanvas.style.cursor = t === 'blackout' ? 'crosshair' : 'default';
  }
  toolBlackout?.classList.toggle('active', t === 'blackout');
  toolBlackout?.setAttribute('aria-pressed', String(t === 'blackout'));
  toolEdit?.classList.toggle('active', t === 'edit');
  toolEdit?.setAttribute('aria-pressed', String(t === 'edit'));
  drawRedactions();
}

// ─── Undo / Redo History ───────────────────────────────────────────────────────
function pushRedaction(r) {
  redactions.push(r);
  pushHistory();
}

function pushHistory() {
  history = history.slice(0, historyIndex + 1);
  history.push(redactions.map(r => ({ ...r })));
  historyIndex = history.length - 1;
  updateToolbarState();
}

function undo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  redactions = history[historyIndex].map(r => ({ ...r }));
  selectedIdx = -1;
  drawRedactions();
  updateToolbarState();
}

function redo() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  redactions = history[historyIndex].map(r => ({ ...r }));
  drawRedactions();
  updateToolbarState();
}

function updateToolbarState() {
  if (undoBtn) undoBtn.disabled = historyIndex <= 0;
  if (redoBtn) redoBtn.disabled = historyIndex >= history.length - 1;
  if (downloadBtn) downloadBtn.disabled = !pdfDoc;
  if (zoomDisplay) zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
}

// ─── Zoom Controls ─────────────────────────────────────────────────────
async function zoom(delta) {
  const newScale = Math.min(3.0, Math.max(0.5, scale + delta));
  if (Math.abs(newScale - scale) < 0.01) return;
  scale = Math.round(newScale * 100) / 100;
  updateToolbarState();
  if (pdfDoc) await renderPage(currentPage);
}

// ─── Fullscreen & Dark Mode ────────────────────────────────────────────────────
function toggleFullscreen() {
  if (!editorWrap) return;
  if (!document.fullscreenElement) {
    editorWrap.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.();
  }
}

function toggleDark() {
  isDark = !isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

// ─── Keyboard Shortcuts ────────────────────────────────────────────────────────
function onKeyDown(e) {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

  if (e.key === 'd' || e.key === 'D') { toggleDark(); return; }
  if (e.key === 'b' || e.key === 'B') { setTool('blackout'); return; }
  if (e.key === 'e' || e.key === 'E') { setTool('edit'); return; }

  if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
    e.preventDefault();
    undo();
    return;
  }
  if ((e.key === 'y' && (e.ctrlKey || e.metaKey)) || (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)) {
    e.preventDefault();
    redo();
    return;
  }
  if ((e.key === 'Delete' || e.key === 'Backspace') && tool === 'edit' && selectedIdx >= 0) {
    e.preventDefault();
    redactions.splice(selectedIdx, 1);
    selectedIdx = -1;
    pushHistory();
    drawRedactions();
    return;
  }
  if (e.key === '+' || e.key === '=') zoom(0.15);
  if (e.key === '-') zoom(-0.15);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPage(currentPage - 1);
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToPage(currentPage + 1);
}

// ─── Export Redacted PDF (pdf-lib Vector Burning) ──────────────────────────────
async function exportRedactedPdf() {
  if (!pdfDoc || !pdfBytes) return;

  if (downloadBtn) {
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = `
      <svg class="loading-spinner" style="width:14px;height:14px;border-width:2px;" viewBox="0 0 24 24"></svg>
      <span>Burning Vector Redactions...</span>
    `;
  }

  try {
    const srcBytes = new Uint8Array(pdfBytes.slice(0));
    const pdfLibDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });
    const pages = pdfLibDoc.getPages();

    for (const r of redactions) {
      const pageIdx = r.page - 1;
      if (pageIdx < 0 || pageIdx >= pages.length) continue;
      const libPage = pages[pageIdx];
      const { width: pageW, height: pageH } = libPage.getSize();

      // Coordinate Inversion Formula:
      // HTML5 canvas (0,0 is top-left) -> PDF user space (0,0 is bottom-left)
      const pdfX = (r.x / r.canvasW) * pageW;
      const pdfY = ((r.canvasH - (r.y + r.h)) / r.canvasH) * pageH;
      const pdfW = (r.w / r.canvasW) * pageW;
      const pdfH = (r.h / r.canvasH) * pageH;

      libPage.drawRectangle({
        x: pdfX,
        y: pdfY,
        width: pdfW,
        height: pdfH,
        color: rgb(0, 0, 0),
        opacity: 1.0,
      });
    }

    const outBytes = await pdfLibDoc.save();
    const blob = new Blob([outBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'redacted_document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    console.log('[PDF Blackout] Export complete. Redacted PDF downloaded successfully.');
  } catch (err) {
    console.error('[PDF Blackout] Export error:', err);
    showError('Export failed. Please check the console for details.');
  } finally {
    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span class="download-text">Download Blackout PDF</span>
      `;
    }
  }
}

// ─── DOM Ready Listener ────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPdfTool);
} else {
  initPdfTool();
}
