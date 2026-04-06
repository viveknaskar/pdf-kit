import { PDFDocument, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let rotatePdfBytes = null;
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
  rotatePdfBytes = await file.arrayBuffer();
  const pdfDoc = await pdfjsLib.getDocument({ data: rotatePdfBytes.slice(0) }).promise;
  selectedPages.clear();

  const container = document.getElementById('rotatePreviews');
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

  document.getElementById('rotateToolbar').style.display = 'flex';
  document.getElementById('rotateResult').classList.remove('active');
}

async function doRotate(angle) {
  if (!rotatePdfBytes) return;
  if (selectedPages.size === 0) { showError('Select at least one page.'); return; }
  setProgress('rotateProgress', 10);
  try {
    const pdfDoc = await PDFDocument.load(rotatePdfBytes, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();
    selectedPages.forEach(pageNum => {
      const page = pages[pageNum - 1];
      page.setRotation(degrees((page.getRotation().angle + angle + 360) % 360));
    });
    const bytes = await pdfDoc.save();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    document.getElementById('rotateDownload').onclick = () => downloadBlob(blob, 'rotated.pdf');
    document.getElementById('rotateResultInfo').textContent = `Rotated ${selectedPages.size} page(s) by ${Math.abs(angle)}°`;
    setProgress('rotateProgress', 100);
    setTimeout(() => hideProgress('rotateProgress'), 500);
    document.getElementById('rotateResult').classList.add('active');
  } catch (err) {
    showError('Error rotating: ' + err.message);
    hideProgress('rotateProgress');
  }
}

export function init() {
  document.getElementById('rotateFileInput').addEventListener('change', function () {
    handleFile(this.files[0]);
  });
  document.getElementById('rotateCW').addEventListener('click', () => doRotate(90));
  document.getElementById('rotateCCW').addEventListener('click', () => doRotate(-90));
  document.getElementById('rotate180').addEventListener('click', () => doRotate(180));
  document.getElementById('rotateSelectAll').addEventListener('click', () => {
    document.querySelectorAll('#rotatePreviews .page-preview').forEach(d => {
      selectedPages.add(parseInt(d.dataset.page));
      d.classList.add('selected');
    });
  });
  document.getElementById('rotateDeselectAll').addEventListener('click', () => {
    selectedPages.clear();
    document.querySelectorAll('#rotatePreviews .page-preview').forEach(d => d.classList.remove('selected'));
  });
}
