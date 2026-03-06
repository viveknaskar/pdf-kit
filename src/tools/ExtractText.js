import * as pdfjsLib from 'pdfjs-dist';
import { setProgress, hideProgress, showError, showSuccess } from '../core/Utils.js';

async function handleFile(file) {
  if (!file) return;
  setProgress('extractProgress', 10);
  try {
    const bytes = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
    let allText = '';

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      allText += `--- Page ${i} ---\n${pageText}\n\n`;
      setProgress('extractProgress', 10 + (80 * i / pdfDoc.numPages));
    }

    setProgress('extractProgress', 100);
    setTimeout(() => hideProgress('extractProgress'), 500);
    document.getElementById('extractedText').value = allText;
    document.getElementById('extractResult').classList.add('active');
  } catch (err) {
    showError('Error extracting: ' + err.message);
    hideProgress('extractProgress');
  }
}

export function init() {
  document.getElementById('extractFileInput').addEventListener('change', function () {
    handleFile(this.files[0]);
  });
  document.getElementById('extractCopyBtn').addEventListener('click', async () => {
    const textarea = document.getElementById('extractedText');
    try {
      await navigator.clipboard.writeText(textarea.value);
      showSuccess('Text copied to clipboard');
    } catch {
      textarea.select();
      document.execCommand('copy');
      showSuccess('Text copied to clipboard');
    }
  });
}
