import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let splitPdfBytes = null;
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
  splitPdfBytes = await file.arrayBuffer();
  const pdfDoc = await pdfjsLib.getDocument({ data: splitPdfBytes.slice(0) }).promise;
  selectedPages.clear();

  const container = document.getElementById('splitPreviews');
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
    div.innerHTML = `<div class="page-check">✓</div><span class="page-num">${i}</span>`;
    div.insertBefore(canvas, div.firstChild);
    div.addEventListener('click', () => togglePage(div, i));
    container.appendChild(div);
  }

  document.getElementById('splitOptions').style.display = 'flex';
  document.getElementById('splitActions').style.display = 'flex';
  document.getElementById('splitResult').classList.remove('active');
}

async function doSplit() {
  const mode = document.getElementById('splitMode').value;
  setProgress('splitProgress', 10);

  try {
    const srcDoc = await PDFDocument.load(splitPdfBytes, { ignoreEncryption: true });

    if (mode === 'all') {
      const downloads = document.getElementById('splitDownloads');
      downloads.innerHTML = '';
      const total = srcDoc.getPageCount();
      for (let i = 0; i < total; i++) {
        const newDoc = await PDFDocument.create();
        const [page] = await newDoc.copyPages(srcDoc, [i]);
        newDoc.addPage(page);
        const bytes = await newDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const btn = document.createElement('button');
        btn.className = 'btn-secondary';
        btn.textContent = `Page ${i + 1}`;
        btn.style.marginRight = '8px';
        btn.style.marginBottom = '8px';
        btn.onclick = () => downloadBlob(blob, `page_${i + 1}.pdf`);
        downloads.appendChild(btn);
        setProgress('splitProgress', 10 + (80 * (i + 1) / total));
      }
      document.getElementById('splitResultInfo').textContent = `Split into ${total} individual pages`;
    } else {
      if (selectedPages.size === 0) { showError('Select at least one page.'); hideProgress('splitProgress'); return; }
      const newDoc = await PDFDocument.create();
      const sorted = Array.from(selectedPages).sort((a, b) => a - b);
      const pages = await newDoc.copyPages(srcDoc, sorted.map(p => p - 1));
      pages.forEach(p => newDoc.addPage(p));
      const bytes = await newDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const downloads = document.getElementById('splitDownloads');
      downloads.innerHTML = '';
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = 'Download extracted pages';
      btn.onclick = () => downloadBlob(blob, 'extracted.pdf');
      downloads.appendChild(btn);
      document.getElementById('splitResultInfo').textContent = `Extracted ${sorted.length} page(s) — ${formatSize(bytes.length)}`;
    }

    setProgress('splitProgress', 100);
    setTimeout(() => hideProgress('splitProgress'), 500);
    document.getElementById('splitResult').classList.add('active');
  } catch (err) {
    showError('Error splitting: ' + err.message);
    hideProgress('splitProgress');
  }
}

export function init() {
  document.getElementById('splitFileInput').addEventListener('change', function () {
    handleFile(this.files[0]);
  });
  document.getElementById('splitBtn').addEventListener('click', doSplit);
  document.getElementById('splitSelectAll').addEventListener('click', () => {
    document.querySelectorAll('#splitPreviews .page-preview').forEach(d => {
      selectedPages.add(parseInt(d.dataset.page));
      d.classList.add('selected');
    });
  });
  document.getElementById('splitDeselectAll').addEventListener('click', () => {
    selectedPages.clear();
    document.querySelectorAll('#splitPreviews .page-preview').forEach(d => d.classList.remove('selected'));
  });
}
