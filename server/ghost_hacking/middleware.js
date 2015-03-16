

module.exports = function(expressApp) {
    expressApp.all('*', function(req, res, next){
      req.url = req.url.substring("public/".length);
      console.log("new url : ", req.url);
      next();
    });

}
