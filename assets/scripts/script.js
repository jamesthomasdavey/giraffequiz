import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {

  const quizQuestionEl = document.querySelector(`h1.quiz__question`);
  const trackerEl = document.querySelector(`p.quiz__tracker`);
  const progressEl = document.querySelector(`div.quiz__progress`);
  const instructionEl = document.querySelector(`p.quiz__instruction`);
  const quizChoicesEl = document.querySelector(`ul.quiz__choices`);
  const nextButtonEl = document.querySelector(`button.next`);
  const restartButtonEl = document.querySelector(`button.restart`);

  const q1 = new Question(
    `How much sleep do giraffes need per day?`, [`4 to 6 Hours`, `10 to 13 Hours`, `5 to 30 Minutes`, `1 to 2 Hours`],
    2
  );
  const q2 = new Question(
    `Where do giraffes live?`, [`The Savannas of Africa`, `The Outskirts of the Amazon`, `The Deserts of Western Asia`, `The South of France`],
    0
  );
  const q3 = new Question(
    `What is a group of giraffes called?`, [`A Murder`, `A Crowd`, `A Den`, `A Tower`],
    3
  );
  const q4 = new Question(
    `How long do wild giraffes live?`, [`40 to 50 Years`, `20 to 25 Years`, `8 to 10 Years`, `10 to 15 Years`],
    1
  );
  const q5 = new Question(
    `How often do giraffes need to drink water?`, [`Every Couple of Days`, `Every Two Weeks`, `Every 8 Hours`, `Never.`],
    0
  );

  const quiz = new Quiz([q1, q2, q3, q4, q5]);

  const renderQuestion = () => {
    quizQuestionEl.innerHTML = quiz.getCurrentQuestion().question;
  }

  const renderTracker = () => {
    trackerEl.innerHTML = `${quiz.currentIndex + 1} of ${quiz.getQuizLength()}`
  }

  const getPercent = (num1, num2) => {
    return Math.round(num1 / num2 * 100);
  }

  const renderProgress = () => {
    let previousWidth = getPercent(quiz.currentIndex - 1, quiz.getQuizLength());
    let newWidth = getPercent(quiz.currentIndex, quiz.getQuizLength());
    let increaseProgress = setInterval(function() {
      if (previousWidth >= newWidth) {
        clearInterval(increaseProgress);
      } else {
        previousWidth++;
        progressEl.style.width = `${previousWidth}%`;
      }
    }, 15);
  }

  const renderChoices = () => {
    let markup = ``;
    for (let i=0; i<quiz.getCurrentChoices().length; i++) {
      let currentChoice = quiz.getCurrentChoices()[i];
      markup +=
        `<li class="quiz__choice">
          <input id="choice${i}" type="radio" name="choice" data-index="${i}" class="quiz__choice-input">
          <label for="choice${i}" class="quiz__choice-label">${currentChoice}
          </label>
        </li>`;
    }
    quizChoicesEl.innerHTML = markup;
  }

  const listeners = () => {
    nextButtonEl.addEventListener(`click`, function() {
      const userGuess = document.querySelector(`.quiz__choice-input:checked`).getAttribute(`data-index`);
      if (userGuess) {
        quiz.guess(userGuess);
        renderAll();
      }
    });
    restartButtonEl.addEventListener(`click`, function() {
      quiz.score = 0;
      quiz.currentIndex = 0;
      progressEl.style.width = `0`;
      instructionEl.innerHTML = `Pick an option below!`;
      nextButtonEl.style.display = `block`;
      renderAll();
    });
  }

  const renderEndscreen = () => {
    quizQuestionEl.innerHTML = `Good job!`;
    trackerEl.innerHTML = `Your score: ${getPercent(quiz.score, quiz.getQuizLength())}`;
    renderProgress();
    instructionEl.innerHTML = `Complete!`;
    quizChoicesEl.innerHTML = ``;
    nextButtonEl.style.display = `none`;
  }

  const renderAll = () => {
    if (quiz.hasEnded()) {
      renderEndscreen();
    } else {
      renderQuestion();
      renderTracker();
      renderProgress();
      renderChoices();
    }
  }

  return {
    renderAll,
    listeners
  }

})();

App.renderAll();
App.listeners();