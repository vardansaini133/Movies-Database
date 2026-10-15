const API_KEY = '14dec6b1863bb3c030b87f939844eff1';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Fetch and display popular movies on load
async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render movies to the DOM
function displayMovies(movies) {
    moviesGrid.innerHTML = '';
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<p class="no-results">No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const { title, poster_path, vote_average, release_date } = movie;
        
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        const posterUrl = poster_path 
            ? `${IMAGE_BASE_URL}${poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image';

        movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="rating">${vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
            </div>
        `;
        
        moviesGrid.appendChild(movieCard);
    });
}

// Initial fetch for popular movies
fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

// Search functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});