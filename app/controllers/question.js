const Base = require('./base.js');

exports.create = function() {
  return new Question();
}

class Question extends Base {

  index(req, res) {
    var self = this;
    self.res = res;

    // 新規
    var id = req.params.id;
    if (id == 'new') {
      self.question = {
        _id : 'new',
        content : "",
        sort : 999,
      };
      self._view();
    }
    // 編集
    else {
      self.mQuestions.findOne(id, function(question = {}){
        self.question = question;
        self._view();
      });
    }
  }

  // 画面表示
  _view() {
    this.res.render('question', {question : this.question, back : true});
  }

  regist(req, res) {
    console.log(req.body);
    var params = req.body;

    params.sort = Number(params.sort); // 数値変換
    this.mQuestions.upsert(req.params.id, params, function(result){
      res.redirect(302, '/questions');
    });
  }

  remove(req, res) {
    this.mQuestions.remove(req.params.id, function(result){
      res.redirect(302, '/questions');
    });
  }
}
