/**
 * Reviews Module
 * Handles review submission functionality
 */

import { apiGet, apiPost } from '../utils/api.js';
import { isAuthenticated, getToken } from '../utils/auth.js';
import { escapeHtml, getQueryParam } from '../utils/dom.js';

/**
 * Setup review form based on authentication
 */
export function setupReviewForm(placeId) {
    const reviewSection = document.getElementById('add-review');
    const reviewForm = document.getElementById('review-form');
    const separateReviewLink = document.getElementById('separate-review-link');

    if (!reviewSection || !reviewForm) {
        console.error('Review form elements not found');
        return;
    }

    // Setup link to separate review page
    if (separateReviewLink) {
        separateReviewLink.href = `/add-review?place_id=${placeId}`;
    }

    // Check if user is authenticated
    if (!isAuthenticated()) {
        reviewForm.style.display = 'none';
        if (separateReviewLink) {
            separateReviewLink.parentElement.style.display = 'none';
        }
        const loginMessage = document.createElement('p');
        loginMessage.className = 'login-required';
        loginMessage.innerHTML = 'Please <a href="/login">login</a> to add a review.';
        reviewSection.appendChild(loginMessage);
    } else {
        reviewForm.style.display = 'block';
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await submitReview(placeId, reviewForm);
        });
    }
}

/**
 * Submit a review
 */
async function submitReview(placeId, form) {
    const reviewText = document.getElementById('review-text').value.trim();
    const rating = document.getElementById('rating').value;

    if (!reviewText || !rating) {
        alert('Please fill in all fields');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        const response = await apiPost('/reviews/', {
            text: reviewText,
            rating: parseInt(rating),
            place_id: placeId
        }, true);

        if (response.ok) {
            alert('Review submitted successfully!');
            window.location.reload();
        } else {
            const data = await response.json();
            alert(`Failed to submit review: ${data.error || 'Unknown error'}`);
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Unable to submit review. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

/**
 * Initialize add review page
 */
export function initAddReviewPage() {
    console.log('Initializing add review page...');

    if (!isAuthenticated()) {
        console.log('User not authenticated, redirecting to index...');
        window.location.href = '/';
        return;
    }

    const placeId = getQueryParam('place_id');
    if (!placeId) {
        alert('No place ID provided. Redirecting to home page.');
        window.location.href = '/';
        return;
    }

    fetchAndDisplayPlaceInfo(placeId);

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const reviewText = document.getElementById('review').value.trim();
            const rating = document.getElementById('rating').value;

            if (!reviewText || !rating) {
                alert('Please fill in all fields');
                return;
            }

            const submitButton = reviewForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            try {
                const response = await apiPost('/reviews/', {
                    text: reviewText,
                    rating: parseInt(rating),
                    place_id: placeId
                }, true);

                if (response.ok) {
                    alert('Review submitted successfully!');
                    window.location.href = `/place?id=${placeId}`;
                } else {
                    const data = await response.json();
                    alert(`Failed to submit review: ${data.error || 'Unknown error'}`);
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('Unable to submit review. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
}

/**
 * Fetch and display place information
 */
async function fetchAndDisplayPlaceInfo(placeId) {
    const placeInfoContainer = document.getElementById('place-info');
    if (!placeInfoContainer) return;

    try {
        const response = await apiGet(`/places/${placeId}`);

        if (!response.ok) {
            placeInfoContainer.innerHTML = '<p class="error-message">Unable to load place information</p>';
            return;
        }

        const place = await response.json();
        placeInfoContainer.innerHTML = `
            <h2>Reviewing: ${escapeHtml(place.title || 'Unknown Place')}</h2>
            <p><strong>Location:</strong> ${escapeHtml(place.description || 'No description available')}</p>
            <p><strong>Price:</strong> $${(place.price || 0).toFixed(2)} / night</p>
        `;
    } catch (error) {
        console.error('Error fetching place info:', error);
        placeInfoContainer.innerHTML = '<p class="error-message">Unable to load place information</p>';
    }
}
