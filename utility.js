const toolbar = document.querySelector('.toolbar');
const closeBtn = document.querySelector('.close-btn');
const gitHubIcon = document.querySelector('.fab');

closeBtn.addEventListener('click', () => {
  toolbar.style.display = 'none';
});

toolbar.addEventListener('mouseover', () => {
    gitHubIcon.style.animation = 'pulse 1s infinite';
})