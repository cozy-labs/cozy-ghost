var path = require('path');

module.exports = function(expressApp) {
    expressApp.all('*', function(req, res, next){
      console.log("orig url : ", req.url);
      if(req.url.match(/^\/public.*/)){
        req.url = req.url.substring("public/".length);
        console.log("new url : ", req.url);
      }else{
        req.url = path.join("/ghost/", req.url);
        console.log("private url", req.url);
      }
      next();
    });
}
