import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

let watermarkFile = null;

async function doWatermark() {
  if (!watermarkFile) return;
  setProgress('watermarkProgress', 20);
  try {
    const bytes = await watermarkFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();
    const text = document.getElementById('watermarkText').value || 'WATERMARK';
    const opacity = parseFloat(document.getElementById('watermarkOpacity').value);

    pages.forEach(page => {
      const { width, height } = page.getSize();
      const fontSize = Math.min(width, height) * 0.12;
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: (width - textWidth * 0.7) / 2,
        y: height / 2 - fontSize / 2,
        size: fontSize, font,
        color: rgb(0.5, 0.5, 0.5),
        opacity,
        rotate: degrees(45),
      });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    setProgress('watermarkProgress', 100);
    setTimeout(() => hideProgress('watermarkProgress'), 500);
    document.getElementById('watermarkResultInfo').textContent = `"${text}" added to ${pages.length} pages — ${formatSize(pdfBytes.length)}`;
    document.getElementById('watermarkDownload').onclick = () => downloadBlob(blob, 'watermarked_' + watermarkFile.name);
    document.getElementById('watermarkResult').classList.add('active');
  } catch (err) {
    showError('Error: ' + err.message);
    hideProgress('watermarkProgress');
  }
}

export function init() {
  document.getElementById('watermarkFileInput').addEventListener('change', function () {
    watermarkFile = this.files[0];
    if (watermarkFile) {
      document.getElementById('watermarkOptions').style.display = 'flex';
      document.getElementById('watermarkActions').style.display = 'flex';
    }
  });
  document.getElementById('watermarkBtn').addEventListener('click', doWatermark);
}
