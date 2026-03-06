import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { formatSize, downloadBlob, setProgress, hideProgress, showError } from '../core/Utils.js';

function parseHtmlToBlocks(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const blocks = [];

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.replace(/\s+/g, ' ').trim();
      if (text) blocks.push({ type: 'text', text, fontSize: 11, bold: false });
      return;
    }
    const tag = node.tagName ? node.tagName.toLowerCase() : '';
    if (tag === 'h1') { blocks.push({ type: 'text', text: node.textContent.trim(), fontSize: 22, bold: true, spaceBefore: 12 }); return; }
    if (tag === 'h2') { blocks.push({ type: 'text', text: node.textContent.trim(), fontSize: 18, bold: true, spaceBefore: 10 }); return; }
    if (tag === 'h3') { blocks.push({ type: 'text', text: node.textContent.trim(), fontSize: 14, bold: true, spaceBefore: 8 }); return; }
    if (tag === 'p')  { blocks.push({ type: 'text', text: node.textContent.trim(), fontSize: 11, bold: false, spaceBefore: 6 }); return; }
    if (tag === 'br') { blocks.push({ type: 'br' }); return; }
    if (tag === 'hr') { blocks.push({ type: 'hr' }); return; }
    if (tag === 'ul' || tag === 'ol') {
      Array.from(node.children).forEach((li, i) => {
        const bullet = tag === 'ol' ? `${i + 1}.` : '•';
        blocks.push({ type: 'text', text: `  ${bullet}  ${li.textContent.trim()}`, fontSize: 11, bold: false, spaceBefore: 3 });
      });
      return;
    }
    node.childNodes.forEach(walk);
  }

  div.childNodes.forEach(walk);
  return blocks;
}

async function doConvert() {
  const html = document.getElementById('htmlInput').value.trim();
  if (!html) { showError('Paste some HTML first.'); return; }

  setProgress('html2pdfProgress', 10);
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pageWidth = 612, pageHeight = 792;
    const marginX = 46, marginRight = pageWidth - 46;
    const maxWidth = marginRight - marginX;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = 740;

    function newPageIfNeeded(needed) {
      if (y - needed < 50) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = 740;
      }
    }

    function drawWrappedText(text, fontSize, bold, spaceBefore = 0) {
      if (!text) return;
      const f = bold ? fontBold : font;
      const words = text.split(' ');
      let line = '';
      const lineHeight = fontSize * 1.5;
      y -= spaceBefore;

      for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (f.widthOfTextAtSize(test, fontSize) > maxWidth && line) {
          newPageIfNeeded(lineHeight);
          page.drawText(line, { x: marginX, y, size: fontSize, font: f, color: rgb(0, 0, 0) });
          y -= lineHeight;
          line = word;
        } else {
          line = test;
        }
      }
      if (line) {
        newPageIfNeeded(lineHeight);
        page.drawText(line, { x: marginX, y, size: fontSize, font: f, color: rgb(0, 0, 0) });
        y -= lineHeight;
      }
    }

    const blocks = parseHtmlToBlocks(html);
    setProgress('html2pdfProgress', 40);

    for (const block of blocks) {
      if (block.type === 'br') { y -= 8; continue; }
      if (block.type === 'hr') {
        newPageIfNeeded(16);
        page.drawLine({ start: { x: marginX, y }, end: { x: marginRight, y }, thickness: 0.5, color: rgb(0.7, 0.7, 0.7) });
        y -= 16;
        continue;
      }
      drawWrappedText(block.text, block.fontSize, block.bold, block.spaceBefore || 0);
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    setProgress('html2pdfProgress', 100);
    setTimeout(() => hideProgress('html2pdfProgress'), 500);
    document.getElementById('html2pdfResultInfo').textContent = `${pdfDoc.getPageCount()} page(s) — ${formatSize(pdfBytes.length)}`;
    document.getElementById('html2pdfDownload').onclick = () => downloadBlob(blob, 'document.pdf');
    document.getElementById('html2pdfResult').classList.add('active');
  } catch (err) {
    showError('Error: ' + err.message);
    hideProgress('html2pdfProgress');
  }
}

export function init() {
  document.getElementById('html2pdfBtn').addEventListener('click', doConvert);
}
