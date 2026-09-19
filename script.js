const songs = [
    {
        title: "A Vachi B Pai",
        artist: "M. M. Keeravani, Mathangi Jagdish",
        src: "song1.mp3"
    },
    {
        title: "Agni Skalana",
        artist: "M. M. Keeravani, Mathangi",
        src: "song2.mp3"
    },
    {
        title: "Gala Gala",
        artist: "Jassie Gift, K. S. Chithra",
        src: "song3.mp3"
    }
];

let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const play = document.getElementById("play");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong() {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

function playSong() {
    audio.play();
    play.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    play.textContent = "▶";
}

play.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong();
    playSong();
});

document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong();
    playSong();
});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;
    }

    current.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    index = (index + 1) % songs.length;
    loadSong();
    playSong();
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
};

songs.forEach((song, i) => {
    const item = document.createElement("div");

    item.className = "song";
    item.textContent =
        `${i + 1}. ${song.title} - ${song.artist}`;

    item.addEventListener("click", () => {
        index = i;
        loadSong();
        playSong();
    });

    playlist.appendChild(item);
});

loadSong();