import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { downloadBlob, setProgress, hideProgress, hexToRgb, showError } from '../core/Utils.js';

let addtextPdfBytes = null;
let addtextAnnotations = {};
let addtextMode = 'text';
let addtextCurrentPage = 0;
let isDrawing = false;
let currentDrawPoints = [];

function drawAnnotation(ctx, ann, scale) {
  if (ann.type === 'text') {
    ctx.font = `${ann.size * scale}px sans-serif`;
    ctx.fillStyle = ann.color;
    ctx.fillText(ann.text, ann.x * scale, ann.y * scale);
  } else if (ann.type === 'draw' && ann.points.length > 1) {
    ctx.strokeStyle = ann.color;
    ctx.lineWidth = ann.size * scale * 0.1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(ann.points[0].x * scale, ann.points[0].y * scale);
    ann.points.forEach(p => ctx.lineTo(p.x * scale, p.y * scale));
    ctx.stroke();
  }
}

async function renderPage() {
  addtextCurrentPage = parseInt(document.getElementById('addtextPage').value);
  const pdfDoc = await pdfjsLib.getDocument({ data: addtextPdfBytes.slice(0) }).promise;
  const page = await pdfDoc.getPage(addtextCurrentPage + 1);
  const scale = 1.5;
  const vp = page.getViewport({ scale });
  const canvas = document.getElementById('addtextCanvas');
  canvas.width = vp.width;
  canvas.height = vp.height;
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport: vp }).promise;

  const anns = addtextAnnotations[addtextCurrentPage] || [];
  anns.forEach(a => drawAnnotation(ctx, a, scale));

  canvas.onmousedown = e => onMouseDown(e, canvas, scale);
  canvas.onmousemove = e => onMouseMove(e, canvas, scale);
  canvas.onmouseup = () => onMouseUp();
}

function onMouseDown(e, canvas, scale) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / scale;
  const y = (e.clientY - rect.top) / scale;

  if (addtextMode === 'text') {
    const text = prompt('Enter text:');
    if (!text) return;
    if (!addtextAnnotations[addtextCurrentPage]) addtextAnnotations[addtextCurrentPage] = [];
    addtextAnnotations[addtextCurrentPage].push({
      type: 'text', x, y, text,
      color: document.getElementById('addtextColor').value,
      size: parseInt(document.getElementById('addtextSize').value)
    });
    renderPage();
  } else if (addtextMode === 'draw') {
    isDrawing = true;
    currentDrawPoints = [{ x, y }];
  }
}

function onMouseMove(e, canvas, scale) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / scale;
  const y = (e.clientY - rect.top) / scale;
  currentDrawPoints.push({ x, y });

  const ctx = canvas.getContext('2d');
  if (currentDrawPoints.length > 1) {
    const prev = currentDrawPoints[currentDrawPoints.length - 2];
    ctx.strokeStyle = document.getElementById('addtextColor').value;
    ctx.lineWidth = parseInt(document.getElementById('addtextSize').value) * scale * 0.1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(prev.x * scale, prev.y * scale);
    ctx.lineTo(x * scale, y * scale);
    ctx.stroke();
  }
}

function onMouseUp() {
  if (!isDrawing) return;
  isDrawing = false;
  if (currentDrawPoints.length > 1) {
    if (!addtextAnnotations[addtextCurrentPage]) addtextAnnotations[addtextCurrentPage] = [];
    addtextAnnotations[addtextCurrentPage].push({
      type: 'draw',
      points: [...currentDrawPoints],
      color: document.getElementById('addtextColor').value,
      size: parseInt(document.getElementById('addtextSize').value)
    });
  }
  currentDrawPoints = [];
}

async function handleFile(file) {
  if (!file) return;
  addtextPdfBytes = await file.arrayBuffer();
  addtextAnnotations = {};
  addtextCurrentPage = 0;

  const pdfDoc = await pdfjsLib.getDocument({ data: addtextPdfBytes.slice(0) }).promise;
  const select = document.getElementById('addtextPage');
  select.innerHTML = '';
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const opt = document.createElement('option');
    opt.value = i - 1;
    opt.textContent = 'Page ' + i;
    select.appendChild(opt);
  }

  document.getElementById('addtextToolbar').style.display = 'flex';
  document.getElementById('addtextCanvasWrapper').style.display = 'flex';
  document.getElementById('addtextActions').style.display = 'flex';
  renderPage();
}

async function doSave() {
  if (!addtextPdfBytes) return;
  setProgress('addtextProgress', 10);
  try {
    const pdfDoc = await PDFDocument.load(addtextPdfBytes, { ignoreEncryption: true });
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    for (const [pageIdx, anns] of Object.entries(addtextAnnotations)) {
      const page = pages[parseInt(pageIdx)];
      if (!page) continue;
      const { height } = page.getSize();

      for (const ann of anns) {
        if (ann.type === 'text') {
          const c = hexToRgb(ann.color);
          page.drawText(ann.text, {
            x: ann.x, y: height - ann.y, size: ann.size, font,
            color: rgb(c.r / 255, c.g / 255, c.b / 255)
          });
        } else if (ann.type === 'draw' && ann.points.length > 1) {
          const c = hexToRgb(ann.color);
          for (let i = 1; i < ann.points.length; i++) {
            page.drawLine({
              start: { x: ann.points[i - 1].x, y: height - ann.points[i - 1].y },
              end: { x: ann.points[i].x, y: height - ann.points[i].y },
              thickness: ann.size * 0.1,
              color: rgb(c.r / 255, c.g / 255, c.b / 255)
            });
          }
        }
      }
      setProgress('addtextProgress', 10 + (80 * (parseInt(pageIdx) + 1) / pages.length));
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    setProgress('addtextProgress', 100);
    setTimeout(() => hideProgress('addtextProgress'), 500);
    document.getElementById('addtextDownload').onclick = () => downloadBlob(blob, 'annotated.pdf');
    document.getElementById('addtextResult').classList.add('active');
  } catch (err) {
    showError('Error saving: ' + err.message);
    hideProgress('addtextProgress');
  }
}

function setMode(mode) {
  addtextMode = mode;
  document.getElementById('addtextModeText').classList.toggle('active', mode === 'text');
  document.getElementById('addtextModeDraw').classList.toggle('active', mode === 'draw');
}

export function init() {
  document.getElementById('addtextFileInput').addEventListener('change', function () { handleFile(this.files[0]); });
  document.getElementById('addtextModeText').addEventListener('click', () => setMode('text'));
  document.getElementById('addtextModeDraw').addEventListener('click', () => setMode('draw'));
  document.getElementById('addtextPage').addEventListener('change', renderPage);
  document.getElementById('addtextBtn').addEventListener('click', doSave);
  document.getElementById('addtextUndoBtn').addEventListener('click', () => {
    const anns = addtextAnnotations[addtextCurrentPage];
    if (anns && anns.length > 0) { anns.pop(); renderPage(); }
  });
}
