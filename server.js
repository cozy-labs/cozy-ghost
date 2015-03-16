var ghost = require('./server/ghost/core/index');
var path = require('path');
var importer = require(path.join(__dirname,'./server/ghost/core/server/data/importer/index'));
var cozydb = require('cozydb');
var Blog = require('./server/models/blog');


cozydb.configure(__dirname, null, function(){

  ghost().then(function(ghostServer) {

    Blog.request("all", {}, function(err, blog) {
       if(err !== null) {
        console.log(err);
       } else {
          if (blog.length > 0) {
            console.log(blog[0]);
            importer.doImport(blog[0].content);
          }
          return ghostServer.start();
       }
    });
  });
});
