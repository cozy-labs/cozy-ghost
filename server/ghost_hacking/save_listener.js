var _ = require('lodash');
var Blog = require('../models/blog');
var path = require('path');

var dataExport = require(path.join(__dirname,'../ghost/core/server/data/export'));

var activated = false;

var createOrUpdateOne = function (doc) {
  Blog.request("all", {}, function(err, blogs) {
     if(err !== null) {
      console.log(err);
     } else {
        if (blogs.length > 0) {
          console.log("update...");
          Blog.find(blogs[0]._id, function(err, blog) { //maybe there is a way with cozydb to do a findOne operation ?
            blog.updateAttributes(doc, function(err) {
              if(err != null) {
                console.log(err);
              }
              else {
                console.log("success !");
              }
            });
          });
        } else {
          console.log("create...");
          Blog.create(doc, function(err) {
            if(err != null) {
              console.log(err);
            }
            else {
              console.log("success !");
            }
          });
        }
     }
  });
};


var saveListener = _.debounce(function(){
  console.log("persist blog changes...("+activated+")");

  if (!activated)
    return null;

  dataExport().then(function (exportedData) {
    var db = {db : [exportedData]};
    createOrUpdateOne({content : db});
  });

}, 400);


module.exports.listen = saveListener;

module.exports.activate = function(){
  activated = true;
}
