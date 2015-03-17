var cozydb = require('cozydb');

var CozyInstance = cozydb.getModel('CozyInstance', {
    id:     {type: String},
    domain: {type: String},
    locale: {type: String}
});

CozyInstance.first = function(callback) {
  return CozyInstance.request('all', function(err, instances) {
    if (err) {
      return callback(err);
    } else if (!instances || instances.length === 0) {
      return callback(null, null);
    } else {
      return callback(null, instances[0]);
    }
  });
};

CozyInstance.getDomain = function(callback) {
  return CozyInstance.first(function(err, instance) {
    return callback(err, (instance != null ? instance.domain : void 0) || null);
  });
};


module.exports = CozyInstance;
