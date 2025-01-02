const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading');
const startButton = document.getElementById('start');
const videos = document.querySelectorAll('[id^="v"]');
const continueButton = document.getElementById('continue');
let loadedVideosCount = 0;




continueButton.addEventListener('click', ()=> {
  window.location.href="survey.html";
})






startButton.addEventListener('click', function () {
  loadingScreen.style.display = 'none';
}
)


// Function to check if all videos are loaded
function checkAllVideosLoaded() {
  loadedVideosCount++;
  if (loadedVideosCount >= 9) {
    // All videos are loaded, introduce a delay and then show the content
    setTimeout(() => {
      loadingText.style.display = 'none';
      startButton.style.display = 'block';
    }, 3000); // 
  }

}



// Create an IntersectionObserver for each video element
videos.forEach(video => {
  video.addEventListener('loadeddata', checkAllVideosLoaded);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        if (!video.paused && entry.intersectionRatio < 1) {
          video.load();
          video.pause();
        } else {
          video.pause();
        }
      }
    });
  }, { threshold: 0 });

  observer.observe(video);

  const videoContainer = document.querySelector(`.video-container[data-video="${video.id}"]`);
  if (videoContainer) {
    videoContainer.style.height = video.videoHeight + 'px';
  }
});




