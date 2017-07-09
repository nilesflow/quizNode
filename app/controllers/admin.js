const Base = require('./base.js');

exports.create = function() {
  return new Admin();
}

class Admin extends Base {

  index(req, res) {
    this.res = res;
    this._view();
  }

  _view() {
    this.res.render('admin');
  }
}
