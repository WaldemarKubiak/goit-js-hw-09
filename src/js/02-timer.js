import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateChosenInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysDisplay = document.querySelector('span[data-days]');
const hoursDisplay = document.querySelector('span[data-hours]');
const minutesDisplay = document.querySelector('span[data-minutes]');
const secondsDisplay = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');

startBtn.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', startCountDownTime);

      function startCountDownTime() {
        timerId = setInterval(() => {
          startBtn.disabled = true;
          const countdown =
            new Date(dateChosenInput.value).getTime() - new Date().getTime();
          const setTime = convertMs(countdown);

          if (countdown >= 0) {
            daysDisplay.textContent = addLeadingZero(setTime.days);
            hoursDisplay.textContent = addLeadingZero(setTime.hours);
            minutesDisplay.textContent = addLeadingZero(setTime.minutes);
            secondsDisplay.textContent = addLeadingZero(setTime.seconds);
            // last 5 seconds with other color
            if (countdown <= 5900) {
              timer.style.color = '#ff4500';
            }
          } else {
            // if (countdown < 500) {
            Notiflix.Notify.info('The time is over!');
            timer.style.color = '#3388ff'; //seting timer in other color when the countdown is over
            clearInterval(timerId);
            // }
          }
        }, 1000);
      }
    }
    // console.log(selectedDates[0]);
  },
};

flatpickr(dateChosenInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// console.log(dateInput);
// console.log(startBtn);
// console.log(daysDisplay);
// console.log(hoursDisplay);
// console.log(minutesDisplay);
// console.log(secondsDisplay);

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
