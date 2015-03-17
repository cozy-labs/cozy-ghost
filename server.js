var ghost = require('./server/ghost/core/index');
var path = require('path');
var importer = require(path.join(__dirname,'./server/ghost/core/server/data/importer/index'));
var cozydb = require('cozydb');
var Blog = require('./server/models/blog');
var models = require(path.join(__dirname,'./server/ghost/core/server/models/index'));
var saveListener = require('./server/ghost_hacking/save_listener');

var initial_datum = require('./server/ghost_hacking/initial_datum');

cozydb.configure(__dirname, null, function(){

  ghost().then(function(ghostServer) {
    console.log("ghost.then()");
    models.deleteAllContent().then(function(){ //delete old blog post to avoid duplicate entries
      Blog.request("all", {}, function(err, blog) {
         if(err !== null) {
          console.log(err);
         } else {
            if (blog.length > 0) {
              console.log("importing...");
              importer.doImport.bind(importer)({data : blog[0].content.db[0]});
              console.log("importing...done");
            }else {
              importer.doImport.bind(importer)({data : initial_datum.db[0]});
            }
            //saveListener.activate();
            return ghostServer.start();
         }
      });
    });
  });
});
