import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  let delayVal = Number(firstDelay.value); //!!!const will creat only one promise-step!!!
  const stepVal = Number(stepDelay.value);
  const amountVal = Number(amountInput.value);
  for (let position = 1; position <= amountVal; position++) {
    createPromise(position, delayVal)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayVal += stepVal;
  }
});

// console.log(form);
// console.log(firstDelay);
// console.log(stepDelay);
// console.log(amountInput);
