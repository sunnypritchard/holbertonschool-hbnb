/**
 * Authentication Utilities
 * Handles user authentication state and token management
 */

import { getCookie, deleteCookie } from './cookies.js';

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export function isAuthenticated() {
    return getCookie('token') !== null;
}

/**
 * Get authentication token
 * @returns {string|null} JWT token or null if not found
 */
export function getToken() {
    return getCookie('token');
}

/**
 * Logout user by removing token
 */
export function logout() {
    deleteCookie('token');
    window.location.href = '/';
}

/**
 * Update login/logout link based on authentication state
 */
export function updateLoginLink() {
    const loginLink = document.getElementById('login-link');
    if (!loginLink) return;

    if (isAuthenticated()) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = '/login';
    }
}
