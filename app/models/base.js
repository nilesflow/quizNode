var Mongo = require(process.cwd() + '/core/modules/mongo.js');

class Base {
  constructor() {
    this.mongo = Mongo.getInstance();
  }

  find(cb) {
    this.mongo.find(this.collections, function(results) {
      cb(results)
    });
  }

  findOne(id, cb) {
    if (!id) {
      cb();
      return;
    }

    this.mongo.findOne(this.collections, id, function(result){
      cb(result);
    });
  }

  upsert(id, params, cb) {
    if (id == 'new') {
    console.log(this.collections);
      this.mongo.insert(this.collections, params, function(result){
        cb(result);
      });
    }
    else {
      this.mongo.update(this.collections, id, params, function(result){
        cb(result);
      });
    }
  }

  remove(id, cb) {
    this.mongo.remove(this.collections, id, function(result){
      cb(result);
    });
  }
}

module.exports = Base;
