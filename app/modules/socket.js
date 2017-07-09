// socket.io
const EventEmitter = require('events').EventEmitter;

var instance = null;

exports.create = function(http, options) {
  instance =  new SocketIO(http, options);
  return instance;
}

exports.getInstance = function(){
  return instance;
}

class SocketIO extends EventEmitter {

/**
 * @constructor
 * @param http {Object} HTTPサーバ
 * @param options {Object} オプション
 */
  constructor(http, options) {
    super();
    var self = this;

    self.handleDisplay = null;
    self.handleRemain  = null;
    self.handleAnswer  = null;

    // オプション保持
    self.options = options;

    // 生成
    self.io = require('socket.io')(http);
    self.io.on('connection', function(socket){
      console.log('a user connected');

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });

      // ユーザからの投票
      socket.on('vote', self.onVote.bind(self, socket));
    });
  }

  // 画面切り替え
  display(id) {
    this.stopDisplay();
    this.stopRemain();
    this.stopAnswer();

    this.startDisplay(id);
  }

  // 画面切り替えの停止
  stop(id) {
    this.stopDisplay();
    this.stopRemain();
    this.stopAnswer();
  }

  // カウント開始
  start(id) {
    var self = this;

    // 答え停止
    this.stopAnswer();

    // 残り時間タイマーを再起動
    this.stopRemain();
    this.startRemain();
  }

  // 答え送信タイマー開始
  answer(param) {
    var self = this;

    // 残り時間タイマーを停止
    this.stopRemain();
    this.stopAnswer();

    // 答え起動
    this.startAnswer(param);
  }

  startDisplay(id) {
    var self = this;
    self.handleDisplay = setInterval(function(){
      var data = {id : id};
      var json = JSON.stringify(data);
      self.io.emit('display', json);
    }, 1000);
  }

  stopDisplay() {
    if (this.handleDisplay) {
      clearInterval(this.handleDisplay);
      this.handleDisplay = null;
    }
  }

  startRemain() {
    var self = this;
    self.remain = self.options.remain;
    self.handleRemain = setInterval(function(){
      var data = {remain : self.remain};
      var json = JSON.stringify(data);
      self.io.emit('remain', json);
      self.remain -= 1;
      if (self.remain < 0) {
        self.stopRemain();
      }
    }, 1000);
  }

  stopRemain() {
    if (this.handleRemain) {
      clearInterval(this.handleRemain);
      this.handleRemain = null;
    }
  }

  startAnswer(param) {
    var self = this;
    self.handleAnswer = setInterval(function(){
      var json = JSON.stringify(param);
      self.io.emit('answer', json);
    }, 1000);
  }

  stopAnswer() {
    if (this.handleAnswer) {
      clearInterval(this.handleAnswer);
      this.handleAnswer = null;
    }
  }

  inDisplay() {
    return (this.handleDisplay != null) ? true : false;
  }

  inRemain() {
    return (this.handleRemain != null) ? true : false;
  }

  inAnswer() {
    return (this.handleAnswer != null) ? true : false;
  }

  // ユーザからの入力
  onVote(socket, json) {
    console.log('message: ' + json);

    // クイズ開始中でなければ受け付けない
    if (!this.inRemain()) {
      var json = JSON.stringify({'message': 'クイズの解答時間中に選択してください。'});
      socket.emit('warning', json);
      return;
    }

    // 一旦、コントローラへ
    var param = JSON.parse(json);
    this.emit('vote', param);
  }

  // スクリーンに送信
  vote(param) {
    var json = JSON.stringify(param);
    this.io.emit('vote to screen', json);
  }
}
