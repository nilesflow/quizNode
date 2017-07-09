const Base = require('./base.js');

exports.create = function() {
  return new Questions();
}

class Questions extends Base {

  constructor() {
    super();
    this.collections = 'questions';
  }
}
