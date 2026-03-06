/**
 * Format bytes into a human-readable string.
 */
export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

/**
 * Trigger a file download from a Blob.
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Set progress bar to a percentage.
 */
export function setProgress(id, pct) {
  const bar = document.getElementById(id);
  bar.classList.add('active');
  bar.querySelector('.progress-bar-fill').style.width = pct + '%';
}

/**
 * Hide and reset a progress bar.
 */
export function hideProgress(id) {
  const bar = document.getElementById(id);
  bar.classList.remove('active');
  bar.querySelector('.progress-bar-fill').style.width = '0%';
}

/**
 * Show a toast error message.
 */
export function showError(msg) {
  showToast(msg, 'error');
}

/**
 * Show a toast success message.
 */
export function showSuccess(msg) {
  showToast(msg, 'success');
}

function showToast(msg, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Convert hex color (#rrggbb) to {r, g, b} (0-255).
 */
export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
