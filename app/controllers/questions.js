const Base = require('./base.js');

exports.create = function() {
  return new Questions();
}

class Questions extends Base {

  index(req, res) {
    var self = this;
    self.res = res;
    self.mQuestions.find(function(questions = {}){
      self.questions = questions;
      self._view();
    });
  }

  // 画面表示
  _view() {
    this.res.render('questions', {questions : this.questions, backpage : '/admin'});
  }
}
