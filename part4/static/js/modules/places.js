/**
 * Places Module
 * Handles places list display and filtering functionality
 */

import { apiGet } from '../utils/api.js';
import { updateLoginLink } from '../utils/auth.js';
import { escapeHtml } from '../utils/dom.js';

// Store all places globally for filtering
let allPlaces = [];

/**
 * Initialize places/index page
 */
export function initIndexPage() {
    console.log('Initializing index page...');
    updateLoginLink();
    fetchPlaces();
    setupPriceFilter();
}

/**
 * Fetch all places from API and display them
 */
async function fetchPlaces() {
    const placesContainer = document.getElementById('places-list');
    if (!placesContainer) {
        console.error('Places container not found');
        return;
    }

    try {
        const response = await apiGet('/places');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const places = await response.json();
        console.log('Fetched places:', places);
        allPlaces = places;
        displayPlaces(places);
        populatePriceFilter(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        placesContainer.innerHTML = '<p class="error">Failed to load places. Please try again later.</p>';
    }
}

/**
 * Display places in the places container
 */
function displayPlaces(places) {
    const placesContainer = document.getElementById('places-list');
    if (!placesContainer) return;

    if (!places || places.length === 0) {
        placesContainer.innerHTML = '<p>No places available.</p>';
        return;
    }

    placesContainer.innerHTML = '';
    places.forEach(place => {
        const placeCard = createPlaceCard(place);
        placesContainer.appendChild(placeCard);
    });
}

/**
 * Create a place card element
 */
function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.setAttribute('data-place-id', place.id);
    card.setAttribute('data-price', place.price || 0);

    card.innerHTML = `
        <h3>${escapeHtml(place.title || 'Untitled Place')}</h3>
        <p class="place-price">$${(place.price || 0).toFixed(2)} / night</p>
        <button class="details-button" data-id="${place.id}">View Details</button>
    `;

    const detailsButton = card.querySelector('.details-button');
    detailsButton.addEventListener('click', () => {
        window.location.href = `/place?id=${place.id}`;
    });

    return card;
}

/**
 * Populate price filter dropdown
 */
function populatePriceFilter(places) {
    const priceFilter = document.getElementById('price-filter');
    if (!priceFilter) return;

    const options = [
        { value: '', text: 'All Prices' },
        { value: '0-50', text: 'Under $50' },
        { value: '50-100', text: '$50 - $100' },
        { value: '100-200', text: '$100 - $200' },
        { value: '200-999999', text: 'Over $200' }
    ];

    priceFilter.innerHTML = '';
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        priceFilter.appendChild(option);
    });
}

/**
 * Set up price filter event listener
 */
function setupPriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    if (!priceFilter) return;

    priceFilter.addEventListener('change', (event) => {
        const filterValue = event.target.value;
        filterPlacesByPrice(filterValue);
    });
}

/**
 * Filter places by price range
 */
function filterPlacesByPrice(filterValue) {
    if (!allPlaces || allPlaces.length === 0) {
        console.error('No places data available for filtering');
        return;
    }

    let filteredPlaces = allPlaces;

    if (filterValue) {
        const [minPrice, maxPrice] = filterValue.split('-').map(Number);
        filteredPlaces = allPlaces.filter(place => {
            const price = place.price || 0;
            return price >= minPrice && price <= maxPrice;
        });
    }

    console.log(`Filtered to ${filteredPlaces.length} places`);
    displayPlaces(filteredPlaces);
}
