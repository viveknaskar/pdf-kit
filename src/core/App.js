/**
 * App.js — Renders the full app HTML and handles navigation.
 */

/**
 * Render the entire app shell into #app.
 */
export function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- HEADER -->
    <header>
      <div class="logo" id="logoBtn">pdf<span>kit</span></div>
      <nav id="mainNav">
        <button class="active" data-section="essentials">Essentials</button>
        <button data-section="edit">Edit & Organize</button>
        <button data-section="convert">Convert</button>
        <button data-section="about">About</button>
        <button data-section="howitworks">How does it Work?</button>
        <button data-section="support">Support</button>
      </nav>
    </header>

    <!-- HOME VIEW -->
    <div id="homeView">
      <section class="hero">
        <h1>Free PDF tools,<br><em>no nonsense</em></h1>
        <p>Merge, split, compress, convert, and edit PDFs right in your browser. No uploads to servers. No watermarks. No sign-up.</p>
        <div class="hero-badges">
          <span>No watermark</span>
          <span>Files stay on device</span>
          <span>Works offline</span>
          <span>100% free</span>
        </div>
      </section>

      <div class="tools-container">
        <!-- ESSENTIALS -->
        <div class="tool-section" id="section-essentials">
          <div class="section-label">Essentials</div>
          <div class="tool-grid">
            <div class="tool-card" data-tool="merge" style="--card-accent: var(--accent); --icon-bg: rgba(255,107,74,0.12)">
              <div class="tool-icon">📎</div>
              <h3>Merge PDFs</h3>
              <p>Combine multiple PDFs into one. Drag to reorder.</p>
            </div>
            <div class="tool-card" data-tool="split" style="--card-accent: var(--blue); --icon-bg: rgba(96,165,250,0.12)">
              <div class="tool-icon">✂️</div>
              <h3>Split PDF</h3>
              <p>Extract specific pages or split into individual pages.</p>
            </div>
            <div class="tool-card" data-tool="compress" style="--card-accent: var(--green); --icon-bg: rgba(74,222,128,0.12)">
              <div class="tool-icon">📦</div>
              <h3>Compress PDF</h3>
              <p>Reduce file size while keeping quality.</p>
            </div>
          </div>
        </div>

        <!-- CONVERT -->
        <div class="tool-section" id="section-convert">
          <div class="section-label">Convert</div>
          <div class="tool-grid">
            <div class="tool-card" data-tool="pdf2jpg" style="--card-accent: var(--yellow); --icon-bg: rgba(251,191,36,0.12)">
              <div class="tool-icon">🖼️</div>
              <h3>PDF to JPG</h3>
              <p>Convert PDF pages to high-quality images.</p>
            </div>
            <div class="tool-card" data-tool="img2pdf" style="--card-accent: var(--purple); --icon-bg: rgba(167,139,250,0.12)">
              <div class="tool-icon">📷</div>
              <h3>Images to PDF</h3>
              <p>Convert JPG, PNG images into a single PDF.</p>
            </div>
            <div class="tool-card" data-tool="html2pdf" style="--card-accent: var(--pink); --icon-bg: rgba(244,114,182,0.12)">
              <div class="tool-icon">🌐</div>
              <h3>HTML to PDF</h3>
              <p>Convert HTML code into a PDF document.</p>
            </div>
          </div>
        </div>

        <!-- EDIT & ORGANIZE -->
        <div class="tool-section" id="section-edit">
          <div class="section-label">Edit & Organize</div>
          <div class="tool-grid">
            <div class="tool-card" data-tool="organize" style="--card-accent: var(--blue); --icon-bg: rgba(96,165,250,0.12)">
              <div class="tool-icon">🔀</div>
              <h3>Organize Pages</h3>
              <p>Reorder, rotate, or delete pages visually.</p>
            </div>
            <div class="tool-card" data-tool="addtext" style="--card-accent: var(--accent); --icon-bg: rgba(255,107,74,0.12)">
              <div class="tool-icon">✏️</div>
              <h3>Add Text / Sign</h3>
              <p>Add text, annotations, or draw a signature on any PDF.</p>
            </div>
            <div class="tool-card" data-tool="pagenums" style="--card-accent: var(--purple); --icon-bg: rgba(167,139,250,0.12)">
              <div class="tool-icon">🔢</div>
              <h3>Page Numbers</h3>
              <p>Add page numbers with custom formatting.</p>
            </div>
            <div class="tool-card" data-tool="watermark" style="--card-accent: var(--green); --icon-bg: rgba(74,222,128,0.12)">
              <div class="tool-icon">💧</div>
              <h3>Add Watermark</h3>
              <p>Protect docs with text watermarks.</p>
            </div>
            <div class="tool-card" data-tool="encrypt" style="--card-accent: var(--yellow); --icon-bg: rgba(251,191,36,0.12)">
              <div class="tool-icon">🔒</div>
              <h3>Encrypt PDF</h3>
              <p>Password-protect your PDF files.</p>
            </div>
            <div class="tool-card" data-tool="extract" style="--card-accent: var(--pink); --icon-bg: rgba(244,114,182,0.12)">
              <div class="tool-icon">📝</div>
              <h3>Extract Text</h3>
              <p>Copy all text content from a PDF.</p>
            </div>
          </div>
        </div>
      
        <!-- ABOUT -->
        <div class="tool-section" id="section-about">
          <div class="section-label">About</div>
          <div class="info-card">
            <p>pdfkit is a free, open-source collection of PDF tools that runs entirely in your browser. There is no backend, no account required, and no file size limits. Everything is processed locally on your device using WebAssembly and the Canvas API.</p>
            <p style="margin-top:12px">Built with vanilla JavaScript, <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener">pdf-lib</a>, <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener">PDF.js</a>, and <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>. No frontend framework.</p>
          </div>
        </div>

        <!-- HOW DOES IT WORK -->
        <div class="tool-section" id="section-howitworks">
          <div class="section-label">How does it Work?</div>
          <div class="info-card">
            <p>When you upload a file, it never leaves your device. Here is exactly what happens:</p>
            <ol style="margin-top:14px;padding-left:20px;display:flex;flex-direction:column;gap:10px">
              <li><strong>The browser reads the file into memory</strong> using the FileReader / ArrayBuffer API. The file data lives in your browser's RAM, not on any server.</li>
              <li><strong>pdf-lib and PDF.js process it locally</strong> inside your browser tab using JavaScript and WebAssembly.</li>
              <li><strong>The result is generated in memory</strong> as a new Blob object, still entirely in RAM.</li>
              <li><strong>You download it</strong> via a temporary local URL that the browser creates, triggers the download, then immediately revokes.</li>
              <li><strong>When you close the tab</strong>, everything is gone. No trace left anywhere.</li>
            </ol>
            <p style="margin-top:14px;color:var(--text-muted)">No data is ever sent over the network. You can turn off your WiFi after the page loads and every tool will still work.</p>
          </div>
        </div>

        <!-- SUPPORT -->
        <div class="tool-section" id="section-support">
          <div class="section-label">Support</div>
          <div class="info-card">
            <p>pdfkit is free and open-source. If it has been useful to you, consider supporting its development via GitHub Sponsors.</p>
            <a href="https://github.com/sponsors/viveknaskar" target="_blank" rel="noopener" class="btn-sponsor">
              ❤️ Sponsor on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- TOOL VIEWS -->
    ${toolViewsHTML()}

    <footer>
      <p>pdfkit — All processing happens in your browser. Your files never leave your device.</p>
    </footer>
  `;
}

/**
 * Returns the HTML for all tool views.
 */
function toolViewsHTML() {
  return `
    <!-- MERGE -->
    <div class="tool-view" id="tool-merge">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Merge PDFs</h2>
        <p>Combine multiple PDF files into one document. Drag files to reorder them.</p>
      </div>
      <div class="drop-zone" id="mergeDropZone">
        <input type="file" accept=".pdf" multiple id="mergeFileInput">
        <div class="drop-zone-icon">📎</div>
        <h3>Drop PDF files here</h3>
        <p>or click to browse — you can add multiple files</p>
      </div>
      <div class="file-list" id="mergeFileList"></div>
      <div class="action-bar" id="mergeActions" style="display:none">
        <button class="btn-primary" id="mergeBtn">Merge PDFs</button>
        <button class="btn-secondary" id="mergeClearBtn">Clear all</button>
      </div>
      <div class="progress-bar" id="mergeProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="mergeResult">
        <h4>PDFs merged</h4>
        <div class="result-info" id="mergeResultInfo"></div>
        <button class="btn-primary" id="mergeDownload">Download merged PDF</button>
      </div>
    </div>

    <!-- SPLIT -->
    <div class="tool-view" id="tool-split">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Split PDF</h2>
        <p>Select pages to extract, or split into individual pages.</p>
      </div>
      <div class="drop-zone" id="splitDropZone">
        <input type="file" accept=".pdf" id="splitFileInput">
        <div class="drop-zone-icon">✂️</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="page-previews" id="splitPreviews"></div>
      <div class="options-row" id="splitOptions" style="display:none">
        <div class="option-group">
          <label>Mode</label>
          <select id="splitMode">
            <option value="selected">Extract selected pages</option>
            <option value="all">Split all pages</option>
          </select>
        </div>
      </div>
      <div class="action-bar" id="splitActions" style="display:none">
        <button class="btn-primary" id="splitBtn">Split / Extract</button>
        <button class="btn-secondary" id="splitSelectAll">Select all</button>
        <button class="btn-secondary" id="splitDeselectAll">Deselect all</button>
      </div>
      <div class="progress-bar" id="splitProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="splitResult">
        <h4>Split complete</h4>
        <div class="result-info" id="splitResultInfo"></div>
        <div id="splitDownloads"></div>
      </div>
    </div>

    <!-- COMPRESS -->
    <div class="tool-view" id="tool-compress">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Compress PDF</h2>
        <p>Reduce PDF file size. Works best on PDFs with embedded images.</p>
      </div>
      <div class="drop-zone" id="compressDropZone">
        <input type="file" accept=".pdf" id="compressFileInput">
        <div class="drop-zone-icon">📦</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="action-bar" id="compressActions" style="display:none">
        <button class="btn-primary" id="compressBtn">Compress PDF</button>
      </div>
      <div class="progress-bar" id="compressProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="compressResult">
        <h4>Compression complete</h4>
        <div class="result-info" id="compressResultInfo"></div>
        <button class="btn-primary" id="compressDownload">Download compressed PDF</button>
      </div>
    </div>

    <!-- PDF TO JPG -->
    <div class="tool-view" id="tool-pdf2jpg">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>PDF to JPG</h2>
        <p>Convert each page of a PDF into a JPG image.</p>
      </div>
      <div class="drop-zone" id="pdf2jpgDropZone">
        <input type="file" accept=".pdf" id="pdf2jpgFileInput">
        <div class="drop-zone-icon">🖼️</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="options-row" id="pdf2jpgOptions" style="display:none">
        <div class="option-group">
          <label>Quality</label>
          <select id="pdf2jpgQuality">
            <option value="1">Standard (72 DPI)</option>
            <option value="2" selected>High (150 DPI)</option>
            <option value="3">Maximum (216 DPI)</option>
          </select>
        </div>
      </div>
      <div class="action-bar" id="pdf2jpgActions" style="display:none">
        <button class="btn-primary" id="pdf2jpgBtn">Convert to JPG</button>
      </div>
      <div class="progress-bar" id="pdf2jpgProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="pdf2jpgResult">
        <h4>Conversion complete</h4>
        <div class="result-info" id="pdf2jpgResultInfo"></div>
        <div id="pdf2jpgDownloads"></div>
      </div>
    </div>

    <!-- IMAGES TO PDF -->
    <div class="tool-view" id="tool-img2pdf">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Images to PDF</h2>
        <p>Convert JPG or PNG images into a single PDF document.</p>
      </div>
      <div class="drop-zone" id="img2pdfDropZone">
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple id="img2pdfFileInput">
        <div class="drop-zone-icon">📷</div>
        <h3>Drop images here</h3>
        <p>JPG, PNG — you can add multiple</p>
      </div>
      <div class="file-list" id="img2pdfFileList"></div>
      <div class="action-bar" id="img2pdfActions" style="display:none">
        <button class="btn-primary" id="img2pdfBtn">Create PDF</button>
        <button class="btn-secondary" id="img2pdfClearBtn">Clear all</button>
      </div>
      <div class="progress-bar" id="img2pdfProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="img2pdfResult">
        <h4>PDF created</h4>
        <div class="result-info" id="img2pdfResultInfo"></div>
        <button class="btn-primary" id="img2pdfDownload">Download PDF</button>
      </div>
    </div>

    <!-- HTML TO PDF -->
    <div class="tool-view" id="tool-html2pdf">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>HTML to PDF</h2>
        <p>Paste HTML code and convert it to a PDF.</p>
      </div>
      <div style="margin-top: 16px;">
        <textarea id="htmlInput" style="width:100%;min-height:260px;background:var(--bg-card);border:1px solid var(--border);color:var(--text);font-family:'DM Mono',monospace;font-size:13px;padding:16px;border-radius:var(--radius);resize:vertical;outline:none;" placeholder="Paste your HTML here..."></textarea>
      </div>
      <div class="action-bar">
        <button class="btn-primary" id="html2pdfBtn">Convert to PDF</button>
      </div>
      <div class="progress-bar" id="html2pdfProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="html2pdfResult">
        <h4>PDF created from HTML</h4>
        <div class="result-info" id="html2pdfResultInfo"></div>
        <button class="btn-primary" id="html2pdfDownload">Download PDF</button>
      </div>
    </div>

    <!-- ORGANIZE PAGES -->
    <div class="tool-view" id="tool-organize">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Organize Pages</h2>
        <p>Reorder, rotate, or delete PDF pages. Click to select, drag to reorder.</p>
      </div>
      <div class="drop-zone" id="organizeDropZone">
        <input type="file" accept=".pdf" id="organizeFileInput">
        <div class="drop-zone-icon">🔀</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="page-previews" id="organizePreviews" style="cursor:grab"></div>
      <div class="editor-toolbar" id="organizeToolbar" style="display:none">
        <button id="organizeRotateCW">↻ Rotate 90°</button>
        <button id="organizeRotateCCW">↺ Rotate -90°</button>
        <button id="organizeDelete">🗑 Delete selected</button>
      </div>
      <div class="action-bar" id="organizeActions" style="display:none">
        <button class="btn-primary" id="organizeBtn">Save changes</button>
      </div>
      <div class="progress-bar" id="organizeProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="organizeResult">
        <h4>Reorganized PDF ready</h4>
        <div class="result-info" id="organizeResultInfo"></div>
        <button class="btn-primary" id="organizeDownload">Download PDF</button>
      </div>
    </div>

    <!-- ADD TEXT / SIGN -->
    <div class="tool-view" id="tool-addtext">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Add Text / Sign</h2>
        <p>Add text annotations or draw a signature on your PDF pages.</p>
      </div>
      <div class="drop-zone" id="addtextDropZone">
        <input type="file" accept=".pdf" id="addtextFileInput">
        <div class="drop-zone-icon">✏️</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="editor-toolbar" id="addtextToolbar" style="display:none">
        <button class="active" id="addtextModeText">✏️ Text</button>
        <button id="addtextModeDraw">🖊 Draw</button>
        <input type="color" id="addtextColor" value="#000000" title="Color">
        <div style="display:flex;align-items:center;gap:6px;color:var(--text-muted);font-size:13px;">
          Size: <input type="range" id="addtextSize" min="8" max="48" value="16">
        </div>
        <div class="option-group" style="flex-direction:row;align-items:center;gap:6px;">
          <label style="text-transform:none;font-size:13px;">Page:</label>
          <select id="addtextPage"></select>
        </div>
      </div>
      <div class="editor-canvas-wrapper" id="addtextCanvasWrapper" style="display:none">
        <canvas id="addtextCanvas"></canvas>
      </div>
      <div class="action-bar" id="addtextActions" style="display:none">
        <button class="btn-primary" id="addtextBtn">Save PDF</button>
        <button class="btn-secondary" id="addtextUndoBtn">Undo last</button>
      </div>
      <div class="progress-bar" id="addtextProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="addtextResult">
        <h4>PDF saved with annotations</h4>
        <button class="btn-primary" id="addtextDownload">Download PDF</button>
      </div>
    </div>

    <!-- PAGE NUMBERS -->
    <div class="tool-view" id="tool-pagenums">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Add Page Numbers</h2>
        <p>Automatically add page numbers to every page.</p>
      </div>
      <div class="drop-zone" id="pagenumsDropZone">
        <input type="file" accept=".pdf" id="pagenumsFileInput">
        <div class="drop-zone-icon">🔢</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="options-row" id="pagenumsOptions" style="display:none">
        <div class="option-group">
          <label>Position</label>
          <select id="pagenumsPosition">
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
          </select>
        </div>
        <div class="option-group">
          <label>Start from</label>
          <input type="number" id="pagenumsStart" value="1" min="1" style="width:80px">
        </div>
        <div class="option-group">
          <label>Format</label>
          <select id="pagenumsFormat">
            <option value="plain">1, 2, 3</option>
            <option value="dash">- 1 -, - 2 -</option>
            <option value="page">Page 1, Page 2</option>
            <option value="of">1 of N, 2 of N</option>
          </select>
        </div>
      </div>
      <div class="action-bar" id="pagenumsActions" style="display:none">
        <button class="btn-primary" id="pagenumsBtn">Add Page Numbers</button>
      </div>
      <div class="progress-bar" id="pagenumsProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="pagenumsResult">
        <h4>Page numbers added</h4>
        <div class="result-info" id="pagenumsResultInfo"></div>
        <button class="btn-primary" id="pagenumsDownload">Download PDF</button>
      </div>
    </div>

    <!-- WATERMARK -->
    <div class="tool-view" id="tool-watermark">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Add Watermark</h2>
        <p>Add a diagonal text watermark to every page.</p>
      </div>
      <div class="drop-zone" id="watermarkDropZone">
        <input type="file" accept=".pdf" id="watermarkFileInput">
        <div class="drop-zone-icon">💧</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="options-row" id="watermarkOptions" style="display:none">
        <div class="option-group">
          <label>Watermark Text</label>
          <input type="text" id="watermarkText" value="CONFIDENTIAL" style="width:200px">
        </div>
        <div class="option-group">
          <label>Opacity</label>
          <select id="watermarkOpacity">
            <option value="0.1">Light (10%)</option>
            <option value="0.2" selected>Medium (20%)</option>
            <option value="0.35">Heavy (35%)</option>
          </select>
        </div>
      </div>
      <div class="action-bar" id="watermarkActions" style="display:none">
        <button class="btn-primary" id="watermarkBtn">Add Watermark</button>
      </div>
      <div class="progress-bar" id="watermarkProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="watermarkResult">
        <h4>Watermark added</h4>
        <div class="result-info" id="watermarkResultInfo"></div>
        <button class="btn-primary" id="watermarkDownload">Download PDF</button>
      </div>
    </div>

    <!-- ENCRYPT -->
    <div class="tool-view" id="tool-encrypt">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Encrypt PDF</h2>
        <p>Password-protect your PDF. Uses pdf-lib's built-in encryption.</p>
      </div>
      <div class="drop-zone" id="encryptDropZone">
        <input type="file" accept=".pdf" id="encryptFileInput">
        <div class="drop-zone-icon">🔒</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="options-row" id="encryptOptions" style="display:none">
        <div class="option-group">
          <label>Password</label>
          <input type="password" id="encryptPassword" placeholder="Enter password" style="width:220px">
        </div>
        <div class="option-group">
          <label>Confirm Password</label>
          <input type="password" id="encryptPasswordConfirm" placeholder="Confirm password" style="width:220px">
        </div>
      </div>
      <div class="action-bar" id="encryptActions" style="display:none">
        <button class="btn-primary" id="encryptBtn">Encrypt PDF</button>
      </div>
      <div class="result-area" id="encryptResult">
        <h4>PDF encrypted</h4>
        <button class="btn-primary" id="encryptDownload">Download encrypted PDF</button>
      </div>
    </div>

    <!-- EXTRACT TEXT -->
    <div class="tool-view" id="tool-extract">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Extract Text</h2>
        <p>Copy all text from a PDF document.</p>
      </div>
      <div class="drop-zone" id="extractDropZone">
        <input type="file" accept=".pdf" id="extractFileInput">
        <div class="drop-zone-icon">📝</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="progress-bar" id="extractProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="extractResult">
        <h4>Text extracted</h4>
        <textarea id="extractedText" style="width:100%;min-height:300px;background:var(--bg);border:1px solid var(--border);color:var(--text);font-family:var(--font-body);font-size:14px;padding:16px;border-radius:var(--radius-sm);resize:vertical;margin-bottom:12px;" readonly></textarea>
        <button class="btn-primary" id="extractCopyBtn">Copy to clipboard</button>
      </div>
    </div>
  `;
}

/**
 * Show the home view, hide all tool views.
 */
export function showHome() {
  document.getElementById('homeView').style.display = 'block';
  document.querySelectorAll('.tool-view').forEach(v => v.classList.remove('active'));
  window.scrollTo(0, 0);
}

/**
 * Open a specific tool view by name.
 */
export function openTool(tool) {
  document.getElementById('homeView').style.display = 'none';
  document.querySelectorAll('.tool-view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('tool-' + tool);
  if (view) {
    view.classList.add('active');
    view.classList.add('animate-in');
  }
  window.scrollTo(0, 0);
}

/**
 * Bind navigation event listeners. Call after renderApp().
 */
export function initNav() {
  // Logo → home
  document.getElementById('logoBtn').addEventListener('click', showHome);

  // Nav buttons → scroll to sections
  document.querySelectorAll('header nav button').forEach(btn => {
    btn.addEventListener('click', function () {
      showHome();
      const section = this.dataset.section;
      document.querySelectorAll('header nav button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const el = document.getElementById('section-' + section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Tool cards → open tool
  document.querySelectorAll('.tool-card[data-tool]').forEach(card => {
    card.addEventListener('click', () => openTool(card.dataset.tool));
  });

  // Back buttons
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', showHome);
  });
}
