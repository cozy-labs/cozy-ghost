console.log(process.env.NODE_ENV = "development");

var ghost = require('./server/ghost/core/index');
var path = require('path');
var importer = require(path.join(__dirname,'./server/ghost/core/server/data/importer/index'));
var cozydb = require('cozydb');
var Blog = require('./server/models/blog');
var CozyInstance = require('./server/models/instance');
var models = require(path.join(__dirname,'./server/ghost/core/server/models/index'));
var saveListener = require('./server/ghost_hacking/save_listener');

var initial_datum = require('./server/ghost_hacking/initial_datum');

var ghostConfig = require('./server/ghost/config.js');


cozydb.configure(__dirname, null, function(){

  CozyInstance.getDomain(function(err, domain){
    console.log("domain : ", domain);
    ghostConfig.development.url = require('url').resolve(domain, '/public/blog/');

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
              setTimeout(saveListener.activate ,60*1000); //no need to persist the first op
              return ghostServer.start();
           }
        });
      });
    });
  });
});
