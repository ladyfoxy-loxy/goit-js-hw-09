import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";


const dateInput = document.getElementById("datetime-picker");
const daysSpanEl = document.querySelector("span[data-days]");
const hoursSpanEl = document.querySelector("span[data-hours]");
const minutesSpanEl = document.querySelector("span[data-minutes]");
const secondsSpanEl = document.querySelector("span[data-seconds]");
const startBtn = document.querySelector("button[data-start]");

let timerInterval = null;
let selectedDate = null;
let currentDate = null;

startBtn.setAttribute(`disabled`, true);
startBtn.addEventListener ("click", onStartCounter);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
        Notify.failure("Please choose a date in the future!");
      } else {
        selectedDate = selectedDates[0].getTime();
        startBtn.disabled = false;
        Notify.success("OK!");
      }
    },
  };

const flatpickrDate = flatpickr(dateInput, options);
function onStartCounter() {
  counter.start();
}
  
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    timerInterval = setInterval(() => {
      currentDate = Date.now();
      const timeDifference = selectedDate - currentDate;
      updateTimerData(convertMs(timeDifference));
      startBtn.disabled = true;
      dateInput.disabled = true;

      if (timeDifference <= 1000) {
        this.stop();
        Notify.info("Congratulation! Time is over");
      }
    },1000);
  },

  stop() {
    startBtn.disabled = true;
    dateInput.disabled = false;
    clearInterval(timerInterval);
    return;
  },

}

function updateTimerData({ days, hours, minutes, seconds }) {
  daysSpanEl.textContent = `${addLeadingZero(days)}`;
  hoursSpanEl.textContent = `${addLeadingZero(hours)}`;
  minutesSpanEl.textContent = `${addLeadingZero(minutes)}`;
  secondsSpanEl.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}




