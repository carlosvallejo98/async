const seriesList = document.getElementById('series-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchSeries(searchTerm = '') {
    try {
        const response = await axios.get('https://api.tvmaze.com/shows');
        // Filtra las series por término de búsqueda
        const filteredSeries = response.data.filter(show => 
            show.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Limita el número de series a mostrar a 50
        displaySeries(filteredSeries.slice(0, 50));
    } catch (error) {
        console.error('Error fetching series:', error);
    }
}

function displaySeries(series) {
    
    seriesList.innerHTML = '';
    
    series.forEach(show => {
        const card = document.createElement('div');
        card.className = 'series-card';
        card.innerHTML = `
            <h2>${show.name}</h2>
            <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295'}" alt="${show.name}">
            <p>${show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available'}</p>
        `;
        seriesList.appendChild(card);
    });
}


searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    fetchSeries(searchTerm);  // Ejecuta la búsqueda
});

// Cargar todas las series al iniciar importante !!
fetchSeries();



// Abre y cierra el menú al hacer clic en el botón:

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.querySelector('.menu');

    
    menuToggle.addEventListener('click', function(event) {
        menu.classList.toggle('show'); 
        event.stopPropagation(); 
    });

    
    document.addEventListener('click', function() {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show'); 
        }
    });

    
    menu.addEventListener('click', function(event) {
        event.stopPropagation(); 
    });
});
