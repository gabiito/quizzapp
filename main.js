import './style.css'
import Swiper from 'swiper';
import "swiper/css";

const score = {
  "A" : 0,
  "B" : 0,
  "C" : 0,
  "D" : 0,
}

const questions = [
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque molestias ut magnam deserunt?',
    answers: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'A'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'B'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'C'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'D'
      }
    ]
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque molestias ut magnam deserunt?',
    answers: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'D'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'C'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'A'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'B'
      }
    ]
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque molestias ut magnam deserunt?',
    answers: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'A'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'B'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'C'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'D'
      }
    ]
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque molestias ut magnam deserunt?',
    answers: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'B'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'D'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'C'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'A'
      }
    ]
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem neque molestias ut magnam deserunt?',
    answers: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'A'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'C'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'B'
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        group: 'D'
      }
    ]
  },
];

let questionActive = 1;
const swiperWrapper = document.querySelector('.swiper-wrapper');
questions.forEach((question, index) => {
  swiperWrapper.innerHTML += quizzToHTML(question, index + 1);
});

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
  const selected = document.querySelector(`.quizz[data-onquestion="${questionActive}"] .answer.selected`);
  if (selected) {
    const answer = selected.getAttribute('data-grupo');
    score[answer] ++;
    if (!swiper.slideNext()) {
      showPopup('Resultado', `
      <ul>
        <li>A: ${score.A}</li>
        <li>B: ${score.B}</li>
        <li>C: ${score.C}</li>
        <li>D: ${score.D}</li>
      </ul>
      `);
      return
    }
    questionActive ++;
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

function quizzToHTML(quizz, index) {
  const html = `
    <div class="swiper-slide">
      <div class="quizz" data-onquestion="${index}">
        <div class="question">
          <span>${quizz.question}</span>
        </div>
        <div class="answers">
          ${quizz.answers.map(answer => `
            <span class="answer" data-grupo="${answer.group}" data-selected="false">${answer.text}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  return html;
}