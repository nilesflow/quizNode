const EventEmitter = require('events').EventEmitter;

var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var instance = null;

exports.create = function(options) {
  instance =  new Mongo(options);
  return instance;
}

exports.getInstance = function() {
  return instance;
}

class Mongo extends EventEmitter {
  /**
   * @constructor
   * @param options {Object} オプション
   */
  constructor(options) {
    super();

    this.db = new mongo.Db(options.dbname, new mongo.Server(options.host, options.port, {}), {});
  }

  open() {
    var self = this;

    self.db.open(function() {
      console.log('mongo opened.');

      // コントローラへ準備完了を通知
      self.emit('ready');
    });
  }

  find(name, callback) {
    var self = this;

    self.db.collection(name).find().sort({sort : 1}).toArray(function(err, docs) {
      if (err){
        console.warn(err.message);  // returns error if no matching object found
      }else{
        console.dir(docs);
        callback(docs);
      }
    });
  }

  findOne(name, id, callback) {
    var self = this;

    self.db.collection(name).findOne({ _id: ObjectID.createFromHexString(id) }, function(err, r) {
      if (err){
        console.warn(err.message);  // returns error if no matching object found
      }else{
        console.dir(r);
        callback(r);
      }
    });
  }

  insert(name, json, callback) {
    var self = this;

    self.db.collection(name, function(err, collection) {
//      console.log(json);
      collection.insert(json, function(err, result) {
        console.log("insert success");
        console.log(result);
        callback(result);
      });
    });
  }

  update(name, id, json, callback) {
    var self = this;

    self.db.collection(name, function(err, collection) {
      var query = { _id: ObjectID.createFromHexString(id) };
//      console.log(json);
      collection.update(query, json, function() {
        console.log("update success");
        callback();
      });
    });
  }

  remove(name, id, callback) {
    var self = this;

    self.db.collection(name, function(err, collection) {
      var query = { _id: ObjectID.createFromHexString(id) };
      collection.remove(query, function() {
        console.log("remove success");
        callback();
      });
    });
  }

}
