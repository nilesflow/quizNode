const Base = require('./base.js');

exports.create = function() {
  return new Control();
}

class Control extends Base {

  index(req, res) {
    var self = this;
    this.res = res;

    self.mQuestions.find(function(questions){
      self.questions = questions;
      self._view();
    });
  }

  // 画面表示
  _view() {
    this.res.render('control', {
      questions : this.questions,
      back : true,
    });
  }
}
