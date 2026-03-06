import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let pagenumsFile = null;

async function doPageNums() {
  if (!pagenumsFile) return;
  setProgress('pagenumsProgress', 20);
  try {
    const bytes = await pagenumsFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const pos = document.getElementById('pagenumsPosition').value;
    const startNum = parseInt(document.getElementById('pagenumsStart').value) || 1;
    const format = document.getElementById('pagenumsFormat').value;

    pages.forEach((page, i) => {
      const { width, height } = page.getSize();
      const num = i + startNum;
      let text = String(num);
      if (format === 'dash') text = `- ${num} -`;
      if (format === 'page') text = `Page ${num}`;
      if (format === 'of') text = `${num} of ${pages.length}`;

      const textWidth = font.widthOfTextAtSize(text, 10);
      let x, y;
      if (pos.startsWith('bottom')) y = 30; else y = height - 30;
      if (pos.endsWith('center')) x = (width - textWidth) / 2;
      else if (pos.endsWith('right')) x = width - textWidth - 40;
      else x = 40;

      page.drawText(text, { x, y, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    setProgress('pagenumsProgress', 100);
    setTimeout(() => hideProgress('pagenumsProgress'), 500);
    document.getElementById('pagenumsResultInfo').textContent = `${pages.length} pages numbered — ${formatSize(pdfBytes.length)}`;
    document.getElementById('pagenumsDownload').onclick = () => downloadBlob(blob, 'numbered_' + pagenumsFile.name);
    document.getElementById('pagenumsResult').classList.add('active');
  } catch (err) {
    showError('Error: ' + err.message);
    hideProgress('pagenumsProgress');
  }
}

export function init() {
  document.getElementById('pagenumsFileInput').addEventListener('change', function () {
    pagenumsFile = this.files[0];
    if (pagenumsFile) {
      document.getElementById('pagenumsOptions').style.display = 'flex';
      document.getElementById('pagenumsActions').style.display = 'flex';
    }
  });
  document.getElementById('pagenumsBtn').addEventListener('click', doPageNums);
}
