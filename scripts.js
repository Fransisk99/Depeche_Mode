document.addEventListener('DOMContentLoaded', () => {
    const albums = [
    { title: 'Speak & Spell (1981)', artist: 'Depeche Mode', image: 'images/Speak.jpg', price: '$10.00'},
    { title: 'A Broken Frame (1982)', artist: 'Depeche Mode', image: 'images/Broken_frame.jpg', price: '$10.00'},
    { title: 'Construction Time Again (1983)', artist: 'Depeche Mode', image: 'images/Construction.jpg', price: '$10.00' },
    { title: 'Some Great Reward (1984)', artist: 'Depeche Mode', image: 'images/Some_reward.jpg', price: '$10.00'},
    { title: 'Black Celebration (1986)', artist: 'Depeche Mode', image: 'images/Black_cele.jpg', price: '$10.00'},
    { title: 'Music For The Masses (1987)', artist: 'Depeche Mode', image: 'images/Music_masses.jpg', price: '$10.00'}

    ];

    const albumsGrid = document.querySelector('.albums-grid');

    albums.forEach(album => {
        const albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
        albumItem.innerHTML = `
            <img src="${album.image}" alt="${album.title}">
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
            <p>${album.price}</p>
            <button>Buy Now</button>
            <button class="view-tracks" data-album-title="${album.title}">View Tracks</button>
            <div class="tracks" style="display: none;"></div>
        `;
        albumsGrid.appendChild(albumItem);
    });

    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('view-tracks')) {
            const albumTitle = event.target.getAttribute('data-album-title');
            const tracksDiv = event.target.nextElementSibling;

            if (tracksDiv.style.display === 'none') {
                // Fetch tracks from the JSON file
                const response = await fetch('tracks.json');
                const tracksData = await response.json();
                const albumTracks = tracksData.find(album => album.albumTitle === albumTitle);

                // Clear any existing tracks
                tracksDiv.innerHTML = '';

                // Display the tracks with checkbox
                if (albumTracks) {
                    albumTracks.tracks.forEach(track => {
                        const trackItem = document.createElement('div');
                        trackItem.classList.add('track-item');
                        trackItem.innerHTML = `
                            <input type="checkbox" class="track-checkbox">
                            <label>${track}</label>
                        `;
                        tracksDiv.appendChild(trackItem);
                    });
                } else {
                    tracksDiv.textContent = 'No tracks found for this album.';
                }

                tracksDiv.style.display = 'block';
            } else {
                tracksDiv.style.display = 'none';
            }
        }
    });

    document.addEventListener('change', (event) => {
        if (event.target.classList.contains('track-checkbox')) {
            const trackItem = event.target.parentElement;
            if (event.target.checked) {
                trackItem.classList.add('checked');
            } else {
                trackItem.classList.remove('checked');
            }
        }
    });
});
