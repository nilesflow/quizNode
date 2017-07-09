function Ajax() {}

Ajax.prototype.request = function(_options) {
  var options = {
    url  : _options.url,
    data : _options.data,
    type : _options.type,
  };
  options.success = function(XMLHttpRequest, textStatus) {
    if(_options.success) {
      _options.success();
    }
  };
  options.error = function(xhr, textStatus, errorThrown) {
    if(_options.error) {
      var obj = {
        message : ''
      };
      if (xhr.responseText) {
        console.log(xhr.responseText);
        try {
          obj = $.parseJSON(xhr.responseText);
        }
        catch(e) {
        }
      }
      _options.error(obj);
    }
  };
  $.ajax(options);
};

Ajax.prototype.get = function(options) {
  options.type = 'GET';
  this.request(options);
};

Ajax.prototype.post = function(options) {
  options.type = 'POST';
  this.request(options);
};
