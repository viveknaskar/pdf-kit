import * as pdfjsLib from 'pdfjs-dist';
import { setProgress, hideProgress, showError } from '../core/Utils.js';

let pdf2jpgFile = null;

async function doConvert() {
  if (!pdf2jpgFile) return;
  setProgress('pdf2jpgProgress', 5);
  try {
    const bytes = await pdf2jpgFile.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
    const scale = parseFloat(document.getElementById('pdf2jpgQuality').value);
    const downloads = document.getElementById('pdf2jpgDownloads');
    downloads.innerHTML = '';

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const vp = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width;
      canvas.height = vp.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const btn = document.createElement('button');
      btn.className = 'btn-secondary';
      btn.textContent = `Page ${i}.jpg`;
      btn.style.marginRight = '8px';
      btn.style.marginBottom = '8px';
      btn.onclick = () => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `page_${i}.jpg`;
        a.click();
      };
      downloads.appendChild(btn);
      setProgress('pdf2jpgProgress', 5 + (90 * i / pdfDoc.numPages));
    }

    document.getElementById('pdf2jpgResultInfo').textContent = `${pdfDoc.numPages} page(s) converted to JPG`;
    setProgress('pdf2jpgProgress', 100);
    setTimeout(() => hideProgress('pdf2jpgProgress'), 500);
    document.getElementById('pdf2jpgResult').classList.add('active');
  } catch (err) {
    showError('Error converting: ' + err.message);
    hideProgress('pdf2jpgProgress');
  }
}

export function init() {
  document.getElementById('pdf2jpgFileInput').addEventListener('change', function () {
    pdf2jpgFile = this.files[0];
    if (pdf2jpgFile) {
      document.getElementById('pdf2jpgOptions').style.display = 'flex';
      document.getElementById('pdf2jpgActions').style.display = 'flex';
    }
  });
  document.getElementById('pdf2jpgBtn').addEventListener('click', doConvert);
}
