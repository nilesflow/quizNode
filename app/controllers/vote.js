var Socket = require(process.cwd() + '/app/modules/socket.js');

const Base = require('./base.js');

exports.create = function() {
  return new Vote();
}

class Vote extends Base {

  constructor() {
    super();
    this.socket = Socket.getInstance();

    this.socket.on('vote', this.onVote.bind(this));
  }

  index(req, res) {
    var self = this;
    self.res = res;
    self.id = req.params.id;

    console.log(req.query);

    self.mSeats.findOne(req.query.seat, function(seat = {}) {
      self.seat = seat;
      self._findQuestion();
    });
  }

  _findQuestion(id) {
    var self = this;
    self.mQuestions.findOne(self.id, function(question = {}){
      self.question = question;
      self._view();
    });
  }

  // 画面表示
  _view() {
    this.res.render('vote', {
      seat : this.seat,
      question : this.question,
    });
  }

  /* 
   * socket.io イベント処理
   */
   // DBから回答情報を取得
  onVote(param) {
    var self = this;
    self.mQuestions.findOne(param.id, function(r){
      console.log(r);

      // 回答情報を付与して、スクリーンへ
      param.answerName = r['answer' + param.answer];
      self.socket.vote(param);
    });
  }
}
