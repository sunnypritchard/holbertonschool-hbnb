/**
 * DOM Manipulation Utilities
 * Helper functions for working with the DOM
 */

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
export function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Show error message in container
 * @param {string} message - Error message
 * @param {HTMLElement} container - Container element
 */
export function showError(message, container) {
    if (!container) return;
    container.innerHTML = `<p class="error-message">${escapeHtml(message)}</p>`;
    container.style.display = 'block';
}

/**
 * Show success message in container
 * @param {string} message - Success message
 * @param {HTMLElement} container - Container element
 */
export function showSuccess(message, container) {
    if (!container) return;
    container.innerHTML = `<p class="success-message">${escapeHtml(message)}</p>`;
    container.style.display = 'block';
}

/**
 * Hide message container
 * @param {HTMLElement} container - Container element
 */
export function hideMessage(container) {
    if (!container) return;
    container.style.display = 'none';
    container.innerHTML = '';
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
