/**
 * Place Details Module
 * Handles place details view and review display
 */

import { apiGet } from '../utils/api.js';
import { updateLoginLink } from '../utils/auth.js';
import { escapeHtml, getQueryParam } from '../utils/dom.js';
import { setupReviewForm } from './reviews.js';

/**
 * Initialize place details page
 */
export function initPlacePage() {
    console.log('Initializing place details page...');
    updateLoginLink();

    const placeId = getQueryParam('id');
    if (!placeId) {
        showPlaceError('No place ID provided');
        return;
    }

    fetchPlaceDetails(placeId);
    setupReviewForm(placeId);
}

/**
 * Show error message on place page
 */
function showPlaceError(message) {
    const placeDetailsContainer = document.getElementById('place-details');
    const reviewsContainer = document.getElementById('reviews');

    if (placeDetailsContainer) {
        placeDetailsContainer.innerHTML = `
            <div class="error-message">
                <p>${escapeHtml(message)}</p>
                <a href="/">Back to Home</a>
            </div>
        `;
    }

    if (reviewsContainer) {
        reviewsContainer.innerHTML = '';
    }
}

/**
 * Fetch place details from API
 */
async function fetchPlaceDetails(placeId) {
    const placeDetailsContainer = document.getElementById('place-details');
    const reviewsContainer = document.getElementById('reviews');

    try {
        const response = await apiGet(`/places/${placeId}`);

        if (!response.ok) {
            if (response.status === 404) {
                showPlaceError('Place not found');
            } else {
                showPlaceError(`Failed to load place: ${response.status}`);
            }
            return;
        }

        const place = await response.json();
        displayPlaceDetails(place, placeDetailsContainer);
        displayReviews(place.reviews || [], reviewsContainer);

    } catch (error) {
        console.error('Error fetching place details:', error);
        showPlaceError('Unable to load place details. Please try again later.');
    }
}

/**
 * Display place details
 */
function displayPlaceDetails(place, container) {
    if (!container) return;

    const amenitiesList = place.amenities && place.amenities.length > 0
        ? place.amenities.map(a => escapeHtml(a.name)).join(', ')
        : 'No amenities';

    const hostName = `${escapeHtml(place.owner?.first_name || 'Unknown')} ${escapeHtml(place.owner?.last_name || '')}`.trim();

    container.innerHTML = `
        <h1>${escapeHtml(place.title || 'Untitled Place')}</h1>
        <div class="place-details-content">
            <p><strong>Host:</strong> ${hostName}</p>
            <p><strong>Price:</strong> $${(place.price || 0).toFixed(2)} / night</p>
            <p><strong>Description:</strong> ${escapeHtml(place.description || 'No description available')}</p>
            <p><strong>Amenities:</strong> ${amenitiesList}</p>
        </div>
    `;
}

/**
 * Display reviews
 */
function displayReviews(reviews, container) {
    if (!container) return;

    container.innerHTML = '<h2>Reviews</h2>';

    if (!reviews || reviews.length === 0) {
        container.innerHTML += '<p>No reviews yet. Be the first to review!</p>';
        return;
    }

    const reviewsList = document.createElement('div');
    reviewsList.className = 'reviews-list';

    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <p><strong>Rating:</strong> <span class="rating-stars">${'★'.repeat(review.rating || 0)}</span></p>
            </div>
            <p class="review-text">${escapeHtml(review.text || '')}</p>
        `;
        reviewsList.appendChild(reviewCard);
    });

    container.appendChild(reviewsList);
}
