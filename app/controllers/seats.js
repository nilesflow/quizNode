const Base = require('./base.js');

exports.create = function() {
  return new Seats();
}

class Seats extends Base {

  index(req, res) {
    var self = this;
    self.res = res;
    self.mSeats.find(function(seats){
      self.seats = seats;
      self._view();
    });
  }

  // 画面表示
  _view() {
    this.res.render('seats', {questions : this.seats, backpage : '/admin'});
  }
}
