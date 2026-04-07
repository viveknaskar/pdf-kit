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
        <button data-section="howitworks">How does it Work?</button>
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
            <div class="tool-card" data-tool="inspector" style="--card-accent: var(--blue); --icon-bg: rgba(96,165,250,0.12)">
              <div class="tool-icon">🔍</div>
              <h3>PDF Inspector</h3>
              <p>View metadata, page count, file size, and PDF properties.</p>
            </div>
            <div class="tool-card" data-tool="extract" style="--card-accent: var(--pink); --icon-bg: rgba(244,114,182,0.12)">
              <div class="tool-icon">📝</div>
              <h3>Extract Text</h3>
              <p>Copy all text content from a PDF.</p>
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
            <div class="tool-card" data-tool="pdf2png" style="--card-accent: var(--blue); --icon-bg: rgba(96,165,250,0.12)">
              <div class="tool-icon">🏞️</div>
              <h3>PDF to PNG</h3>
              <p>Convert PDF pages to lossless PNG images.</p>
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
            <div class="tool-card" data-tool="decrypt" style="--card-accent: var(--green); --icon-bg: rgba(74,222,128,0.12)">
              <div class="tool-icon">🔓</div>
              <h3>Decrypt PDF</h3>
              <p>Remove password protection from a PDF.</p>
            </div>
            <div class="tool-card" data-tool="rotate" style="--card-accent: var(--accent); --icon-bg: rgba(255,107,74,0.12)">
              <div class="tool-icon">🔄</div>
              <h3>Rotate Pages</h3>
              <p>Rotate individual or all pages by 90° or 180°.</p>
            </div>
            <div class="tool-card" data-tool="deletepages" style="--card-accent: var(--pink); --icon-bg: rgba(244,114,182,0.12)">
              <div class="tool-icon">🗑️</div>
              <h3>Delete Pages</h3>
              <p>Remove unwanted pages from a PDF.</p>
            </div>
          </div>
        </div>
      


        <!-- HOW DOES IT WORK -->
        <div class="tool-section" id="section-howitworks">
          <div class="section-label">How does it Work?</div>
          <div class="info-card">
            <p style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:14px">Your files never leave your device. Ever.</p>
            <p>Most online PDF tools work by sending your file to a server, processing it there, and sending it back. That means your documents pass through someone else's computer — which is a problem if they contain anything sensitive.</p>
            <p style="margin-top:12px">pdfkit works differently. When you drop a file in, your browser reads it directly into memory on your machine. All the processing happens right there in your browser tab. When it is done, your file is ready to download, and nothing was ever sent anywhere.</p>
            <p style="margin-top:12px">Close the tab and it is all gone. No copies stored. No servers involved. You can even go offline after the page loads and everything still works.</p>
            <p style="margin-top:16px;font-size:15px;font-weight:600;color:var(--text)">Your files are yours. We never see them.</p>
          </div>
        </div>

      </div>
    </div>

    <!-- TOOL VIEWS -->
    ${toolViewsHTML()}

    <footer>
      <div class="footer-inner">
        <span class="footer-copy">© ${new Date().getFullYear()} PDF Kit — free &amp; open source</span>
        <div class="footer-links">
          <a href="https://www.producthunt.com/products/pdfkit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-pdfkit" target="_blank" rel="noopener noreferrer"><img alt="pdfkit - Free, secure PDF tools in your browser. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1117224&theme=light&t=1775582223057"></a>          <a class="footer-link footer-star" href="https://github.com/viveknaskar/pdf-kit" target="_blank" rel="noopener">★ Star on GitHub</a>
          <a class="footer-link footer-sponsor" href="https://github.com/sponsors/viveknaskar" target="_blank" rel="noopener">♥ Sponsor</a>
          <a class="footer-link footer-coffee" href="https://buymeacoffee.com/viveknaskar" target="_blank" rel="noopener">☕ Buy me a coffee</a>
        </div>
      </div>
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

    <!-- ROTATE PAGES -->
    <div class="tool-view" id="tool-rotate">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Rotate Pages</h2>
        <p>Select pages and rotate them 90°, -90°, or 180°.</p>
      </div>
      <div class="drop-zone" id="rotateDropZone">
        <input type="file" accept=".pdf" id="rotateFileInput">
        <div class="drop-zone-icon">🔄</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="page-previews" id="rotatePreviews"></div>
      <div class="editor-toolbar" id="rotateToolbar" style="display:none">
        <button id="rotateCW">↻ 90° Clockwise</button>
        <button id="rotateCCW">↺ 90° Counter-clockwise</button>
        <button id="rotate180">↕ 180°</button>
        <button id="rotateSelectAll">Select all</button>
        <button id="rotateDeselectAll">Deselect all</button>
      </div>
      <div class="action-bar" id="rotateActions" style="display:none"></div>
      <div class="progress-bar" id="rotateProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="rotateResult">
        <h4>Pages rotated</h4>
        <div class="result-info" id="rotateResultInfo"></div>
        <button class="btn-primary" id="rotateDownload">Download PDF</button>
      </div>
    </div>

    <!-- DELETE PAGES -->
    <div class="tool-view" id="tool-deletepages">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Delete Pages</h2>
        <p>Click pages to mark them for deletion, then apply.</p>
      </div>
      <div class="drop-zone" id="deleteDropZone">
        <input type="file" accept=".pdf" id="deleteFileInput">
        <div class="drop-zone-icon">🗑️</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="page-previews" id="deletePreviews"></div>
      <div class="action-bar" id="deleteActions" style="display:none">
        <button class="btn-primary" id="deleteBtn">Delete selected pages</button>
        <button class="btn-secondary" id="deleteSelectAll">Select all</button>
        <button class="btn-secondary" id="deleteDeselectAll">Deselect all</button>
      </div>
      <div class="progress-bar" id="deleteProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="deleteResult">
        <h4>Pages deleted</h4>
        <div class="result-info" id="deleteResultInfo"></div>
        <button class="btn-primary" id="deleteDownload">Download PDF</button>
      </div>
    </div>

    <!-- PDF INSPECTOR -->
    <div class="tool-view" id="tool-inspector">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>PDF Inspector</h2>
        <p>View metadata, page info, and file properties — nothing is uploaded.</p>
      </div>
      <div class="drop-zone" id="inspectorDropZone">
        <input type="file" accept=".pdf" id="inspectorFileInput">
        <div class="drop-zone-icon">🔍</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="progress-bar" id="inspectorProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="inspectorResult">
        <h4>PDF properties</h4>
        <table style="width:100%;border-collapse:collapse;margin-top:8px">
          <tbody id="inspectorTableBody"></tbody>
        </table>
      </div>
    </div>

    <!-- DECRYPT PDF -->
    <div class="tool-view" id="tool-decrypt">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>Decrypt PDF</h2>
        <p>Remove password protection from an encrypted PDF.</p>
      </div>
      <div class="drop-zone" id="decryptDropZone">
        <input type="file" accept=".pdf" id="decryptFileInput">
        <div class="drop-zone-icon">🔓</div>
        <h3>Drop an encrypted PDF here</h3>
        <p>or click to browse</p>
      </div>
      <div class="options-row" id="decryptOptions" style="display:none">
        <div class="option-group">
          <label>Password (if required)</label>
          <input type="password" id="decryptPassword" placeholder="Enter PDF password" style="width:240px">
        </div>
      </div>
      <div class="action-bar" id="decryptActions" style="display:none">
        <button class="btn-primary" id="decryptBtn">Decrypt PDF</button>
      </div>
      <div class="result-area" id="decryptResult">
        <h4>PDF decrypted</h4>
        <div class="result-info" id="decryptResultInfo"></div>
        <button class="btn-primary" id="decryptDownload">Download decrypted PDF</button>
      </div>
    </div>

    <!-- PDF TO PNG -->
    <div class="tool-view" id="tool-pdf2png">
      <div class="tool-view-header">
        <button class="back-btn" data-back>← Back to tools</button>
        <h2>PDF to PNG</h2>
        <p>Convert each page of a PDF into a lossless PNG image.</p>
      </div>
      <div class="drop-zone" id="pdf2pngDropZone">
        <input type="file" accept=".pdf" id="pdf2pngFileInput">
        <div class="drop-zone-icon">🏞️</div>
        <h3>Drop a PDF file here</h3>
        <p>or click to browse</p>
      </div>
      <div class="options-row" id="pdf2pngOptions" style="display:none">
        <div class="option-group">
          <label>Resolution</label>
          <select id="pdf2pngQuality">
            <option value="1">Standard (72 DPI)</option>
            <option value="2" selected>High (150 DPI)</option>
            <option value="3">Maximum (216 DPI)</option>
          </select>
        </div>
      </div>
      <div class="action-bar" id="pdf2pngActions" style="display:none">
        <button class="btn-primary" id="pdf2pngBtn">Convert to PNG</button>
      </div>
      <div class="progress-bar" id="pdf2pngProgress"><div class="progress-bar-fill"></div></div>
      <div class="result-area" id="pdf2pngResult">
        <h4>Conversion complete</h4>
        <div class="result-info" id="pdf2pngResultInfo"></div>
        <div id="pdf2pngDownloads"></div>
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
