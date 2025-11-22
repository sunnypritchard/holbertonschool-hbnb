/**
 * API Communication Utilities
 * Handles HTTP requests to the backend API
 */

import { getToken } from './auth.js';

// API base URL
export const API_BASE_URL = `${window.location.origin}/api/v1`;

/**
 * Perform GET request to API
 * @param {string} endpoint - API endpoint (without base URL)
 * @returns {Promise<Response>} Fetch response
 */
export async function apiGet(endpoint) {
    return fetch(`${API_BASE_URL}${endpoint}`);
}

/**
 * Perform POST request to API
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send in request body
 * @param {boolean} authenticated - Whether to include auth token
 * @returns {Promise<Response>} Fetch response
 */
export async function apiPost(endpoint, data, authenticated = false) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (authenticated) {
        headers['Authorization'] = `Bearer ${getToken()}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
}

/**
 * Perform PUT request to API
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} data - Data to send in request body
 * @param {boolean} authenticated - Whether to include auth token
 * @returns {Promise<Response>} Fetch response
 */
export async function apiPut(endpoint, data, authenticated = true) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (authenticated) {
        headers['Authorization'] = `Bearer ${getToken()}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    });
}

/**
 * Perform DELETE request to API
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {boolean} authenticated - Whether to include auth token
 * @returns {Promise<Response>} Fetch response
 */
export async function apiDelete(endpoint, authenticated = true) {
    const headers = {};

    if (authenticated) {
        headers['Authorization'] = `Bearer ${getToken()}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers
    });
}
