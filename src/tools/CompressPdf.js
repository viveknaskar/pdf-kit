import { PDFDocument } from 'pdf-lib';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let compressFile = null;

async function doCompress() {
  if (!compressFile) return;
  setProgress('compressProgress', 20);
  try {
    const bytes = await compressFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    setProgress('compressProgress', 60);
    const compressedBytes = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
    setProgress('compressProgress', 100);
    setTimeout(() => hideProgress('compressProgress'), 500);

    const blob = new Blob([compressedBytes], { type: 'application/pdf' });
    const pctSaved = Math.max(0, ((1 - compressedBytes.length / compressFile.size) * 100)).toFixed(1);
    document.getElementById('compressResultInfo').textContent =
      `${formatSize(compressFile.size)} → ${formatSize(compressedBytes.length)} (${pctSaved}% reduced)`;
    document.getElementById('compressDownload').onclick = () => downloadBlob(blob, 'compressed_' + compressFile.name);
    document.getElementById('compressResult').classList.add('active');
  } catch (err) {
    showError('Error compressing: ' + err.message);
    hideProgress('compressProgress');
  }
}

export function init() {
  document.getElementById('compressFileInput').addEventListener('change', function () {
    compressFile = this.files[0];
    if (compressFile) document.getElementById('compressActions').style.display = 'flex';
  });
  document.getElementById('compressBtn').addEventListener('click', doCompress);
}
