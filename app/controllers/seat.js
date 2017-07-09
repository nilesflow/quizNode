const Base = require('./base.js');

exports.create = function() {
  return new Seat();
}

class Seat extends Base {

  index(req, res) {
    var self = this;
    self.res = res;

    // 新規
    var id = req.params.id;
    if (id == 'new') {
      self.seat = {
        _id : 'new',
        name : "",
        sort : 999,
      };
      self._view();
    }
    // 編集
    else {
      self.mSeats.findOne(id, function(seat = {}){
        self.seat = seat;
        self._view();
      });
    }
  }

  // 画面表示
  _view() {
    this.res.render('seat', {seat : this.seat, back : true});
  }

  regist(req, res) {
    console.log(req.body);
    var params = req.body;

    params.sort = Number(params.sort); // 数値変換
    this.mSeats.upsert(req.params.id, params, function(result){
      res.redirect(302, '/seats');
    });
  }

  remove(req, res) {
    this.mSeats.remove(req.params.id, function(result){
      res.redirect(302, '/seats');
    });
  }
}
