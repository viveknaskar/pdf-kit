import { PDFDocument } from 'pdf-lib';
import { formatSize, downloadBlob, showError } from '../core/Utils.js';

let decryptFile = null;

async function doDecrypt() {
  if (!decryptFile) return;
  const password = document.getElementById('decryptPassword').value;
  try {
    const bytes = await decryptFile.arrayBuffer();
    let pdfDoc;
    try {
      pdfDoc = await PDFDocument.load(bytes, { password, ignoreEncryption: false });
    } catch {
      pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    }
    const newBytes = await pdfDoc.save();
    const blob = new Blob([newBytes], { type: 'application/pdf' });
    document.getElementById('decryptDownload').onclick = () => downloadBlob(blob, 'decrypted_' + decryptFile.name);
    document.getElementById('decryptResultInfo').textContent = formatSize(newBytes.length);
    document.getElementById('decryptResult').classList.add('active');
  } catch (err) {
    showError('Could not decrypt — wrong password? ' + err.message);
  } finally {
    document.getElementById('decryptPassword').value = '';
  }
}

export function init() {
  document.getElementById('decryptFileInput').addEventListener('change', function () {
    decryptFile = this.files[0];
    if (decryptFile) {
      document.getElementById('decryptOptions').style.display = 'flex';
      document.getElementById('decryptActions').style.display = 'flex';
    }
  });
  document.getElementById('decryptBtn').addEventListener('click', doDecrypt);
}
