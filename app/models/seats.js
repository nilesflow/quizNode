const Base = require('./base.js');

exports.create = function() {
  return new Seat();
}

class Seat extends Base {

  constructor() {
    super();
    this.collections = 'seats';
  }
}
