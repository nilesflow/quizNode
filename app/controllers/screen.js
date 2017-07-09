const Base = require('./base.js');

exports.create = function() {
  return new Screen();
}

class Screen extends Base {

  index(req, res) {
    var self = this;
    self.res = res;
    self.mQuestions.findOne(req.params.id, function(question = {}){
      self.question = question;
      self._findSeats();
    });
  }

  _findSeats() {
    var self = this;
    self.mSeats.find(function(seats = {}) {
      self.seats = seats;
      self._view();
    });
  }

  // 画面表示
  _view() {
    this.res.render('screen', {
      seats : this.seats,
      question : this.question,
    });
  }
}
