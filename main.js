import './style.css'
import Swiper from 'swiper';
import "swiper/css";
import 'sweetalert2/dist/sweetalert2.min.css'

const score = {
  "A" : 0,
  "B" : 0,
  "C" : 0,
  "D" : 0,
}
let questionActive = 1;
const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 100,
  allowTouchMove: false,
});

const answers = document.querySelectorAll('.answer');

answers.forEach(answer => {
  answer.addEventListener('click', () => {
    const answered = document.querySelector('.answer.selected');
    if (answered) {
      answered.classList.remove('selected');
    }
    answer.classList.add('selected');
  });
});

const btn = document.querySelector('.btn.confirm-slection');
btn.addEventListener('click', () => {
  console.log('clicked');
  const selected = document.querySelector(`.quizz[data-onquestion="${questionActive}"] .answer.selected`);
  if (selected) {
    const answer = selected.getAttribute('data-grupo');
    score[answer] ++;
    questionActive ++;
    console.log(score);
    if (!swiper.slideNext()) {
      showPopup('Resultado', `
          <ul>
            <li>A: ${score.A}</li>
            <li>B: ${score.B}</li>
            <li>C: ${score.C}</li>
            <li>D: ${score.D}</li>
          </ul>
            `);
    }
  }
  else {
    showPopup('Error', 'Debes seleccionar una respuesta');
  }
});

const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup-main');
const btnPopup = document.querySelector('.btn.close');

//showPopup function
function showPopup(title, html) {
  const popupTitle = document.querySelector('.popup-title');
  const popupContext = document.querySelector('.popup-context');
  popupTitle.innerText = title;
  popupContext.innerHTML = html;
  popup.classList.add('show');
  setTimeout(() => {
    popupContainer.classList.add('show');
  }, 100);
}

btnPopup.addEventListener('click', () => {
  popupContainer.classList.remove('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 150);
});