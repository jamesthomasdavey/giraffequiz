export default class Question {
  constructor(question, choices, answerKey) {
    this.question = question; // string
    this.choices = choices; // array
    this.answerKey = answerKey // number, referring to an index of choices
  }
  isCorrect(userGuess) {
    return Number(userGuess) === this.answerKey;
  }
}