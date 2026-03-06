import { PDFDocument } from 'pdf-lib';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let img2pdfFiles = [];

function renderList() {
  const list = document.getElementById('img2pdfFileList');
  list.innerHTML = '';
  img2pdfFiles.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span class="file-icon">🖼️</span>
      <span class="file-name">${f.name}</span>
      <span class="file-size">${formatSize(f.size)}</span>
      <button class="file-remove" data-remove="${i}">×</button>
    `;
    list.appendChild(item);
  });
  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      img2pdfFiles.splice(parseInt(btn.dataset.remove), 1);
      renderList();
    });
  });
  document.getElementById('img2pdfActions').style.display = img2pdfFiles.length > 0 ? 'flex' : 'none';
}

async function doConvert() {
  if (img2pdfFiles.length === 0) return;
  setProgress('img2pdfProgress', 5);
  try {
    const pdfDoc = await PDFDocument.create();
    for (let i = 0; i < img2pdfFiles.length; i++) {
      const f = img2pdfFiles[i];
      const bytes = await f.arrayBuffer();
      const image = f.type === 'image/png'
        ? await pdfDoc.embedPng(bytes)
        : await pdfDoc.embedJpg(bytes);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      setProgress('img2pdfProgress', 5 + (85 * (i + 1) / img2pdfFiles.length));
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    setProgress('img2pdfProgress', 100);
    setTimeout(() => hideProgress('img2pdfProgress'), 500);

    document.getElementById('img2pdfResultInfo').textContent = `${img2pdfFiles.length} image(s) → PDF (${formatSize(pdfBytes.length)})`;
    document.getElementById('img2pdfDownload').onclick = () => downloadBlob(blob, 'images.pdf');
    document.getElementById('img2pdfResult').classList.add('active');
  } catch (err) {
    showError('Error creating PDF: ' + err.message);
    hideProgress('img2pdfProgress');
  }
}

export function init() {
  document.getElementById('img2pdfFileInput').addEventListener('change', function () {
    Array.from(this.files).forEach(f => {
      if (f.type.startsWith('image/')) img2pdfFiles.push(f);
    });
    renderList();
  });
  document.getElementById('img2pdfBtn').addEventListener('click', doConvert);
  document.getElementById('img2pdfClearBtn').addEventListener('click', () => {
    img2pdfFiles = [];
    renderList();
    document.getElementById('img2pdfResult').classList.remove('active');
  });
}
