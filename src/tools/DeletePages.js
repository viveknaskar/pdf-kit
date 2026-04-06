import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let deletePdfBytes = null;
let selectedPages = new Set();

function togglePage(div, pageNum) {
  if (selectedPages.has(pageNum)) {
    selectedPages.delete(pageNum);
    div.classList.remove('selected');
  } else {
    selectedPages.add(pageNum);
    div.classList.add('selected');
  }
}

async function handleFile(file) {
  if (!file) return;
  deletePdfBytes = await file.arrayBuffer();
  const pdfDoc = await pdfjsLib.getDocument({ data: deletePdfBytes.slice(0) }).promise;
  selectedPages.clear();

  const container = document.getElementById('deletePreviews');
  container.innerHTML = '';

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const vp = page.getViewport({ scale: 0.4 });
    const canvas = document.createElement('canvas');
    canvas.width = vp.width;
    canvas.height = vp.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;

    const div = document.createElement('div');
    div.className = 'page-preview';
    div.dataset.page = i;
    div.innerHTML = `<div class="page-check">🗑</div><span class="page-num">${i}</span>`;
    div.insertBefore(canvas, div.firstChild);
    div.addEventListener('click', () => togglePage(div, i));
    container.appendChild(div);
  }

  document.getElementById('deleteActions').style.display = 'flex';
  document.getElementById('deleteResult').classList.remove('active');
}

async function doDelete() {
  if (!deletePdfBytes) return;
  if (selectedPages.size === 0) { showError('Select at least one page to delete.'); return; }
  setProgress('deleteProgress', 10);
  try {
    const srcDoc = await PDFDocument.load(deletePdfBytes, { ignoreEncryption: true });
    const total = srcDoc.getPageCount();
    if (selectedPages.size >= total) { showError('Cannot delete all pages — at least one must remain.'); hideProgress('deleteProgress'); return; }

    const keepIndices = [];
    for (let i = 0; i < total; i++) {
      if (!selectedPages.has(i + 1)) keepIndices.push(i);
    }

    const newDoc = await PDFDocument.create();
    const pages = await newDoc.copyPages(srcDoc, keepIndices);
    pages.forEach(p => newDoc.addPage(p));
    const bytes = await newDoc.save();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    document.getElementById('deleteDownload').onclick = () => downloadBlob(blob, 'pages_deleted.pdf');
    document.getElementById('deleteResultInfo').textContent = `Removed ${selectedPages.size} page(s) — ${keepIndices.length} remaining — ${formatSize(bytes.length)}`;
    setProgress('deleteProgress', 100);
    setTimeout(() => hideProgress('deleteProgress'), 500);
    document.getElementById('deleteResult').classList.add('active');
  } catch (err) {
    showError('Error deleting pages: ' + err.message);
    hideProgress('deleteProgress');
  }
}

export function init() {
  document.getElementById('deleteFileInput').addEventListener('change', function () {
    handleFile(this.files[0]);
  });
  document.getElementById('deleteBtn').addEventListener('click', doDelete);
  document.getElementById('deleteSelectAll').addEventListener('click', () => {
    document.querySelectorAll('#deletePreviews .page-preview').forEach(d => {
      selectedPages.add(parseInt(d.dataset.page));
      d.classList.add('selected');
    });
  });
  document.getElementById('deleteDeselectAll').addEventListener('click', () => {
    selectedPages.clear();
    document.querySelectorAll('#deletePreviews .page-preview').forEach(d => d.classList.remove('selected'));
  });
}
