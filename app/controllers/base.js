var Seats = require(process.cwd() + '/app/models/seats.js');
var Questions = require(process.cwd() + '/app/models/questions.js');

class Base {
  constructor() {
    this.mSeats = Seats.create()
    this.mQuestions = Questions.create()
  }
}

module.exports = Base;
