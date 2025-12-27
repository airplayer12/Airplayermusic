const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const fileInput = document.getElementById('file-input');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackAlbum = document.getElementById('track-album');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

let tracks = [];
let currentTrackIndex = 0;

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    tracks = Array.from(files).filter(file => file.type === 'audio/mp3');
    if (tracks.length > 0) {
        loadTrack(currentTrackIndex);
    }
});

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸️'; // Cambiar a pausa
    } else {
        audio.pause();
        playBtn.textContent = '▶️'; // Cambiar a reproducir
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
});

audio.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
});

function loadTrack(index) {
    const track = tracks[index];
    audio.src = URL.createObjectURL(track);
    trackTitle.textContent = track.name;
    trackArtist.textContent = "Artista Desconocido"; // Cambia esto según tu lógica
    trackAlbum.textContent = "Álbum Desconocido"; // Cambia esto según tu lógica
    audio.play();
    playBtn.textContent = '⏸️'; // Cambiar a pausa
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


