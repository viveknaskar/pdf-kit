import { PDFDocument } from 'pdf-lib';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let mergeFiles = [];

function renderList() {
  const list = document.getElementById('mergeFileList');
  list.innerHTML = '';
  mergeFiles.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.draggable = true;
    item.dataset.index = i;
    item.innerHTML = `
      <span class="file-icon">📄</span>
      <span class="file-name">${f.name}</span>
      <span class="file-size">${formatSize(f.size)}</span>
      <button class="file-remove" data-remove="${i}">×</button>
    `;
    item.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', i); item.classList.add('dragging'); });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
    item.addEventListener('dragover', e => e.preventDefault());
    item.addEventListener('drop', e => {
      e.preventDefault(); e.stopPropagation();
      const from = parseInt(e.dataTransfer.getData('text/plain'));
      const [moved] = mergeFiles.splice(from, 1);
      mergeFiles.splice(i, 0, moved);
      renderList();
    });
    list.appendChild(item);
  });

  // Remove buttons
  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      mergeFiles.splice(parseInt(btn.dataset.remove), 1);
      renderList();
    });
  });

  document.getElementById('mergeActions').style.display = mergeFiles.length >= 2 ? 'flex' : 'none';
}

async function doMerge() {
  if (mergeFiles.length < 2) return;
  setProgress('mergeProgress', 10);
  try {
    const merged = await PDFDocument.create();
    for (let i = 0; i < mergeFiles.length; i++) {
      const bytes = await mergeFiles[i].arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
      setProgress('mergeProgress', 10 + (80 * (i + 1) / mergeFiles.length));
    }
    const pdfBytes = await merged.save();
    setProgress('mergeProgress', 100);
    setTimeout(() => hideProgress('mergeProgress'), 500);

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    document.getElementById('mergeResultInfo').textContent = `${mergeFiles.length} files merged — ${formatSize(pdfBytes.length)}`;
    document.getElementById('mergeDownload').onclick = () => downloadBlob(blob, 'merged.pdf');
    document.getElementById('mergeResult').classList.add('active');
  } catch (err) {
    showError('Error merging: ' + err.message);
    hideProgress('mergeProgress');
  }
}

export function init() {
  document.getElementById('mergeFileInput').addEventListener('change', function () {
    Array.from(this.files).forEach(f => {
      if (f.type === 'application/pdf') mergeFiles.push(f);
    });
    renderList();
  });

  document.getElementById('mergeBtn').addEventListener('click', doMerge);
  document.getElementById('mergeClearBtn').addEventListener('click', () => {
    mergeFiles = [];
    renderList();
    document.getElementById('mergeResult').classList.remove('active');
  });
}
