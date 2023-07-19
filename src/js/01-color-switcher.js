// ф-я для рандомного кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyElem = document.querySelector('body');
let timerId = null;

startButton.addEventListener("click", () => {
    startButton.setAttribute('disabled', true);

    timerId = setInterval(() => {
        bodyElem.style.backgroundColor = getRandomHexColor();
    }, 1000)
});

stopButton.addEventListener('click', () => {
    startButton.removeAttribute('disabled');
    clearInterval(timerId);
});