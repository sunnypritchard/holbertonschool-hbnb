/**
 * Configuration Module
 * Central configuration for the application
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
    BASE_URL: `${window.location.origin}/api/v1`,
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3
};

/**
 * Authentication Configuration
 */
export const AUTH_CONFIG = {
    TOKEN_COOKIE_NAME: 'token',
    TOKEN_EXPIRY_DAYS: 1,
    LOGIN_REDIRECT: '/login',
    LOGOUT_REDIRECT: '/'
};

/**
 * UI Configuration
 */
export const UI_CONFIG = {
    PRICE_FILTER_RANGES: [
        { value: '', text: 'All Prices' },
        { value: '0-50', text: 'Under $50' },
        { value: '50-100', text: '$50 - $100' },
        { value: '100-200', text: '$100 - $200' },
        { value: '200-999999', text: 'Over $200' }
    ],
    RATING_OPTIONS: [
        { value: 1, text: '1 - Poor' },
        { value: 2, text: '2 - Fair' },
        { value: 3, text: '3 - Good' },
        { value: 4, text: '4 - Very Good' },
        { value: 5, text: '5 - Excellent' }
    ],
    MESSAGES: {
        LOADING: 'Loading...',
        NO_PLACES: 'No places available.',
        NO_REVIEWS: 'No reviews yet. Be the first to review!',
        ERROR_GENERIC: 'Something went wrong. Please try again.',
        ERROR_NETWORK: 'Unable to connect to server. Please check your connection.',
        SUCCESS_LOGIN: 'Login successful!',
        SUCCESS_REVIEW: 'Review submitted successfully!'
    }
};

/**
 * Feature Flags
 */
export const FEATURES = {
    ENABLE_PRICE_FILTER: true,
    ENABLE_REVIEWS: true,
    ENABLE_FAVORITES: false, // Future feature
    ENABLE_BOOKING: false     // Future feature
};

/**
 * Debug Configuration
 */
export const DEBUG = {
    ENABLED: true,
    LOG_API_CALLS: true,
    LOG_AUTH_EVENTS: true,
    LOG_UI_EVENTS: false
};
