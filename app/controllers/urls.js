const Base = require('./base.js');

exports.create = function() {
  return new Urls();
}

class Urls extends Base {

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
    this.res.render('urls', {seats : this.seats, backpage : '/admin'});
  }
}
