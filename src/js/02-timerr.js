import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const startButton = document.querySelector('button');
const inputElem = document.querySelector('text');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');


startButton.setAttribute('disabled', true);



//об'єкт параметрів, який передаємо у екземпляр flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // disable: [
  //       function(date) {
  //           // return true to disable
  //           return (date < new Date());
  //   }],

  
  onClose(selectedDates) {
    //Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    };
  }
};

const calendar = flatpickr('#datetime-picker', options);

//функція, яка приймає різницю між кінцевою і поточною датою в мілісекундах
//і повертає об'єкт
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

//слухач на кнопку
let timerId = 0;

startButton.addEventListener('click', () => {

  timerId = setInterval(() => { 
  const selected = calendar.selectedDates[0];
  // console.log(selected);
  const difference = Date.parse(selected) - Date.parse(new Date());
  // console.log(difference);
  const differenceObj = convertMs(difference);
    

  if(difference >= 0) {
    daysField.textContent = `${differenceObj.days}`.padStart(2, 0);
    hoursField.textContent = `${differenceObj.hours}`.padStart(2, 0);
    minutesField.textContent = `${differenceObj.minutes}`.padStart(2, 0);
    secondsField.textContent = `${differenceObj.seconds}`.padStart(2, 0);
    }
  else {
    clearInterval(timerId);
  }
  
  }, 1000)
})







//daysField.value = days;