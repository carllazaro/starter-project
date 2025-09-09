const video = document.getElementById('saturnvid');
const playBtn = document.querySelector('.play-btn');

video.controls = false;

playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playBtn.style.display = 'none';
        video.controls = true;
    } else {
        video.pause();
        playBtn.style.display = 'block';
        video.controls = false;
    }
});

video.addEventListener('play', () => {
    playBtn.style.display = 'none';
    video.controls = true;
});

video.addEventListener('pause', () => {
    playBtn.style.display = 'block';
    video.controls = false;
});
