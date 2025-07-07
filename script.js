const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playlist = document.getElementById('playlist');

const songs = [
  { name: 'song1', title: 'Dreams', artist: 'Artist One' },
  { name: 'song2', title: 'Waves', artist: 'Artist Two' },
  { name: 'song3', title: 'Skyline', artist: 'Artist Three' }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `songs/${song.name}.mp3`;
}
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '&#10073;&#10073;';
}
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '&#9654;';
}
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
});
nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  updatePlaylist();
});
audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});
audio.addEventListener('ended', () => {
  nextBtn.click(); // autoplay
});
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
function populatePlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(song);
      playSong();
      updatePlaylist();
    });
    playlist.appendChild(li);
  });
}
function updatePlaylist() {
  [...playlist.children].forEach((li, index) => {
    li.classList.toggle('active', index === songIndex);
  });
}
loadSong(songs[songIndex]);
populatePlaylist();
updatePlaylist();
