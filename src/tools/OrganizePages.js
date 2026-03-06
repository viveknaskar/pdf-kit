import { PDFDocument, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let organizePdfBytes = null;
let organizePages = [];
let organizeSelected = new Set();

async function handleFile(file) {
  if (!file) return;
  organizePdfBytes = await file.arrayBuffer();
  organizePages = [];
  organizeSelected.clear();

  const pdfDoc = await pdfjsLib.getDocument({ data: organizePdfBytes.slice(0) }).promise;
  const container = document.getElementById('organizePreviews');
  container.innerHTML = '';

  for (let i = 0; i < pdfDoc.numPages; i++) {
    organizePages.push({ index: i, rotation: 0 });
    const page = await pdfDoc.getPage(i + 1);
    const vp = page.getViewport({ scale: 0.4 });
    const canvas = document.createElement('canvas');
    canvas.width = vp.width;
    canvas.height = vp.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;

    const div = document.createElement('div');
    div.className = 'page-preview';
    div.dataset.idx = i;
    div.draggable = true;
    div.innerHTML = `<div class="page-check">✓</div><span class="page-num">${i + 1}</span>`;
    div.insertBefore(canvas, div.firstChild);
    div.addEventListener('click', () => {
      if (organizeSelected.has(i)) { organizeSelected.delete(i); div.classList.remove('selected'); }
      else { organizeSelected.add(i); div.classList.add('selected'); }
    });
    div.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', div.dataset.idx);
      div.classList.add('dragging');
    });
    div.addEventListener('dragend', () => div.classList.remove('dragging'));
    div.addEventListener('dragover', e => { e.preventDefault(); div.classList.add('drag-over'); });
    div.addEventListener('dragleave', () => div.classList.remove('drag-over'));
    div.addEventListener('drop', e => {
      e.preventDefault();
      div.classList.remove('drag-over');
      const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
      const toIdx = parseInt(div.dataset.idx);
      if (fromIdx === toIdx) return;
      const fromPos = organizePages.findIndex(p => p.index === fromIdx);
      const toPos = organizePages.findIndex(p => p.index === toIdx);
      const [moved] = organizePages.splice(fromPos, 1);
      organizePages.splice(toPos, 0, moved);
      reRenderPreviews();
    });
    container.appendChild(div);
  }

  document.getElementById('organizeToolbar').style.display = 'flex';
  document.getElementById('organizeActions').style.display = 'flex';
}

function reRenderPreviews() {
  const container = document.getElementById('organizePreviews');
  const divs = Array.from(container.querySelectorAll('.page-preview'));
  const divMap = {};
  divs.forEach(d => { divMap[d.dataset.idx] = d; });
  organizePages.forEach((p, pos) => {
    const d = divMap[p.index];
    d.querySelector('.page-num').textContent = pos + 1;
    container.appendChild(d);
  });
}

function rotateSelected(deg) {
  organizeSelected.forEach(idx => {
    const p = organizePages.find(p => p.index === idx);
    if (p) p.rotation = (p.rotation + deg) % 360;
  });
  document.querySelectorAll('#organizePreviews .page-preview').forEach(div => {
    const idx = parseInt(div.dataset.idx);
    const p = organizePages.find(p => p.index === idx);
    if (p) div.querySelector('canvas').style.transform = `rotate(${p.rotation}deg)`;
  });
}

function deleteSelected() {
  if (organizeSelected.size === organizePages.length) { showError("Can't delete all pages."); return; }
  organizePages = organizePages.filter(p => !organizeSelected.has(p.index));
  organizeSelected.clear();
  document.querySelectorAll('#organizePreviews .page-preview').forEach(div => {
    const idx = parseInt(div.dataset.idx);
    if (!organizePages.find(p => p.index === idx)) div.remove();
  });
}

async function doOrganize() {
  if (!organizePdfBytes) return;
  setProgress('organizeProgress', 10);
  try {
    const srcDoc = await PDFDocument.load(organizePdfBytes, { ignoreEncryption: true });
    const newDoc = await PDFDocument.create();
    for (let i = 0; i < organizePages.length; i++) {
      const { index, rotation } = organizePages[i];
      const [page] = await newDoc.copyPages(srcDoc, [index]);
      if (rotation) page.setRotation(degrees(rotation));
      newDoc.addPage(page);
      setProgress('organizeProgress', 10 + (80 * (i + 1) / organizePages.length));
    }
    const pdfBytes = await newDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    setProgress('organizeProgress', 100);
    setTimeout(() => hideProgress('organizeProgress'), 500);

    document.getElementById('organizeResultInfo').textContent = `${organizePages.length} pages — ${formatSize(pdfBytes.length)}`;
    document.getElementById('organizeDownload').onclick = () => downloadBlob(blob, 'organized.pdf');
    document.getElementById('organizeResult').classList.add('active');
  } catch (err) {
    showError('Error: ' + err.message);
    hideProgress('organizeProgress');
  }
}

export function init() {
  document.getElementById('organizeFileInput').addEventListener('change', function () { handleFile(this.files[0]); });
  document.getElementById('organizeRotateCW').addEventListener('click', () => rotateSelected(90));
  document.getElementById('organizeRotateCCW').addEventListener('click', () => rotateSelected(-90));
  document.getElementById('organizeDelete').addEventListener('click', deleteSelected);
  document.getElementById('organizeBtn').addEventListener('click', doOrganize);
}
