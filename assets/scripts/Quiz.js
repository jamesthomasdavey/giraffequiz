export default class Quiz {
  constructor(questions) {
    this.questions = questions; // array
    this.score = 0;
    this.currentIndex = 0;
  }
  advanceIndex() {
    this.currentIndex ++;
  }
  increaseScore() {
    this.score ++;
  }
  getQuizLength() {
    return this.questions.length;
  }
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }
  getCurrentChoices() {
    return this.getCurrentQuestion().choices;
  }
  guess(userGuess) {
    if (this.getCurrentQuestion().isCorrect(userGuess)) {
      this.increaseScore();
    }
    this.advanceIndex();
  }
  hasEnded() {
    return this.currentIndex === this.getQuizLength();
  }
}