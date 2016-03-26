var express = require('express');
var useragent = require('useragent');

var app = express();
var port = process.env.PORT || 8080;

function getLocale(languagestring) {
  if(languagestring.indexOf(',') === -1) {
    return null;
  }
  return languagestring.split(',')[0];
}

app.get('/api/whoami', function(req, res) {
  var ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var lang = getLocale(req.headers['accept-language'] || '');
  var agent = useragent.parse(req.headers['user-agent']);
  var os = agent.os.toString();
  res.json({
    ipaddress: ip_addr,
    language: lang,
    software: os
  });
});

app.listen(port);
