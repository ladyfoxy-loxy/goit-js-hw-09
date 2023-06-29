import Notiflix from "notiflix";

const addDelay = document.querySelector('[name="delay"]');
const addStep = document.querySelector('[name="step"]');
const addAmount = document.querySelector('[name="amount"]');
const createPromisesBtn = document.querySelector("button");
let position;

createPromisesBtn.addEventListener("click", onCreatePromiseBtn);

function onCreatePromiseBtn(event) {
  event.preventDefault();

  let delay = Number(addDelay.value);
  let step = Number(addStep.value);
  let amount = Number(addAmount.value);

  if(delay < 0 || step < 0 || amount <= 0) {
    return Notiflix.Notify.warning("Add a positive value!");
  }

  for (position = 1; position <= amount; position +=1) {
    createPromise(position, delay)
    .then(({position, delay}) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve ({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  return promise;
}