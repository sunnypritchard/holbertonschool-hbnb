/**
 * Login Module
 * Handles user login functionality
 */

import { apiPost } from '../utils/api.js';
import { setCookie } from '../utils/cookies.js';
import { showError, hideMessage } from '../utils/dom.js';

/**
 * Initialize login page
 */
export function initLoginPage() {
    console.log('Initializing login page...');

    const loginForm = document.getElementById('login-form');
    const errorContainer = document.getElementById('error-message');

    if (!loginForm) {
        console.error('Login form not found');
        return;
    }

    // Add submit event listener
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Hide any previous error messages
        if (errorContainer) {
            hideMessage(errorContainer);
        }

        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Basic client-side validation
        if (!email || !password) {
            showError('Please enter both email and password', errorContainer);
            return;
        }

        // Disable submit button during request
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Signing in...';

        try {
            // Make API request
            const response = await apiPost('/auth/login', {
                email: email,
                password: password
            });

            const data = await response.json();

            if (response.ok && data.access_token) {
                // Success: Store token in cookie
                setCookie('token', data.access_token, 1);
                console.log('Login successful, token stored');

                // Redirect to index page
                window.location.href = '/';
            } else {
                // Login failed: Show error message
                const errorMessage = data.error || 'Invalid email or password';
                showError(errorMessage, errorContainer);

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('Unable to connect to server. Please try again.', errorContainer);

            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
