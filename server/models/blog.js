var cozydb = require('cozydb');

var BlogModel = cozydb.getModel('Blog', {
  content: Object
});

module.exports = BlogModel;
