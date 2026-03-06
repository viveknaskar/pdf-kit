import { PDFDocument } from 'pdf-lib';
import { downloadBlob, showError } from '../core/Utils.js';

let encryptFile = null;

async function doEncrypt() {
  if (!encryptFile) return;
  const password = document.getElementById('encryptPassword').value;
  const confirm = document.getElementById('encryptPasswordConfirm').value;
  if (!password) { showError('Enter a password.'); return; }
  if (password !== confirm) { showError('Passwords do not match.'); return; }
  try {
    const bytes = await encryptFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pdfBytes = await pdfDoc.save({ userPassword: password, ownerPassword: password });
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    document.getElementById('encryptDownload').onclick = () => downloadBlob(blob, 'encrypted_' + encryptFile.name);
    document.getElementById('encryptResult').classList.add('active');
  } catch (err) {
    showError('Error encrypting: ' + err.message);
  }
}

export function init() {
  document.getElementById('encryptFileInput').addEventListener('change', function () {
    encryptFile = this.files[0];
    if (encryptFile) {
      document.getElementById('encryptOptions').style.display = 'flex';
      document.getElementById('encryptActions').style.display = 'flex';
    }
  });
  document.getElementById('encryptBtn').addEventListener('click', doEncrypt);
}
