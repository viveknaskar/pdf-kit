import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { formatSize, setProgress, hideProgress, showError } from '../core/Utils.js';

async function doInspect(file) {
  if (!file) return;
  setProgress('inspectorProgress', 10);
  try {
    const bytes = await file.arrayBuffer();
    setProgress('inspectorProgress', 30);

    const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    setProgress('inspectorProgress', 60);

    const pdfJs = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
    setProgress('inspectorProgress', 85);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage ? firstPage.getSize() : { width: 0, height: 0 };

    const info = {
      'File Name': file.name,
      'File Size': formatSize(file.size),
      'Page Count': pdfDoc.getPageCount(),
      'Page Size (p.1)': firstPage ? `${Math.round(width)} × ${Math.round(height)} pt` : '—',
      'PDF Version': pdfJs.pdfInfo?.PDFFormatVersion ? `PDF ${pdfJs.pdfInfo.PDFFormatVersion}` : '—',
      'Title': pdfDoc.getTitle() || '—',
      'Author': pdfDoc.getAuthor() || '—',
      'Subject': pdfDoc.getSubject() || '—',
      'Creator': pdfDoc.getCreator() || '—',
      'Producer': pdfDoc.getProducer() || '—',
      'Creation Date': pdfDoc.getCreationDate()?.toLocaleDateString() || '—',
      'Modified Date': pdfDoc.getModificationDate()?.toLocaleDateString() || '—',
    };

    const tbody = document.getElementById('inspectorTableBody');
    tbody.innerHTML = Object.entries(info).map(([k, v]) => `
      <tr>
        <td class="inspector-key">${k}</td>
        <td class="inspector-val">${v}</td>
      </tr>
    `).join('');

    setProgress('inspectorProgress', 100);
    setTimeout(() => hideProgress('inspectorProgress'), 500);
    document.getElementById('inspectorResult').classList.add('active');
  } catch (err) {
    showError('Error inspecting PDF: ' + err.message);
    hideProgress('inspectorProgress');
  }
}

export function init() {
  document.getElementById('inspectorFileInput').addEventListener('change', function () {
    if (this.files[0]) doInspect(this.files[0]);
  });
}
