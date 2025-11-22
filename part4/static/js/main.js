/**
 * Main Entry Point
 * Auto-detects page and initializes appropriate module
 */

import { initLoginPage } from './modules/login.js';
import { initIndexPage } from './modules/places.js';
import { initPlacePage } from './modules/place-details.js';
import { initAddReviewPage } from './modules/reviews.js';
import { updateLoginLink } from './utils/auth.js';

/**
 * Detect current page and initialize appropriate module
 */
function initPage() {
    const path = window.location.pathname;
    const page = path === '/' ? 'index' : path.substring(1);

    console.log(`Initializing page: ${page}`);

    // Route to appropriate initialization function
    switch (page) {
        case 'login':
            initLoginPage();
            break;

        case 'index':
        case '':
            initIndexPage();
            break;

        case 'place':
            initPlacePage();
            break;

        case 'add-review':
            initAddReviewPage();
            break;

        default:
            console.warn(`No initialization function for page: ${page}`);
            // At minimum, update login link
            updateLoginLink();
    }
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

/**
 * Export init function for manual initialization if needed
 */
export { initPage };
