// Styles
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/tools.css';

// PDF.js worker setup
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

// Core
import { renderApp, initNav } from './core/App.js';
import { initDropZones } from './core/DropZone.js';

// Tools
import { init as initMerge } from './tools/MergePdf.js';
import { init as initSplit } from './tools/SplitPdf.js';
import { init as initCompress } from './tools/CompressPdf.js';
import { init as initPdf2Jpg } from './tools/PdfToJpg.js';
import { init as initImg2Pdf } from './tools/ImagesToPdf.js';
import { init as initHtml2Pdf } from './tools/HtmlToPdf.js';
import { init as initOrganize } from './tools/OrganizePages.js';
import { init as initAddText } from './tools/AddTextSign.js';
import { init as initPageNums } from './tools/PageNumbers.js';
import { init as initWatermark } from './tools/AddWatermark.js';
import { init as initEncrypt } from './tools/EncryptPdf.js';
import { init as initExtract } from './tools/ExtractText.js';
import { init as initRotate } from './tools/RotatePages.js';
import { init as initDeletePages } from './tools/DeletePages.js';
import { init as initInspector } from './tools/PdfInspector.js';
import { init as initDecrypt } from './tools/DecryptPdf.js';
import { init as initPdf2Png } from './tools/PdfToPng.js';

// Boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  initNav();
  initDropZones();

  // Initialize all tools
  initMerge();
  initSplit();
  initCompress();
  initPdf2Jpg();
  initImg2Pdf();
  initHtml2Pdf();
  initOrganize();
  initAddText();
  initPageNums();
  initWatermark();
  initEncrypt();
  initExtract();
  initRotate();
  initDeletePages();
  initInspector();
  initDecrypt();
  initPdf2Png();
});
