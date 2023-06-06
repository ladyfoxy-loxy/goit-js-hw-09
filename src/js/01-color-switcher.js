const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

startBtn.addEventListener ("click", getRandomHexColor);

function getRandomHexColor() {
    timerId = setInterval(() => {
    document.body.style.background = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}, 1000);
startBtn.setAttribute("disabled", "");
    
};

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled", "");
});
