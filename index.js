var VALID_HOSTNAME_PART = /^[a-z0-9][a-z0-9\-]*$/i;
var MAX_SUBDOMAIN_LENGTH = 63;
var ENDS_WITH_MYSHOPIFY = /\.myshopify.com$/i;

var url = require('url');

module.exports = function (s, options) {
  if (!s || typeof s !== 'string') {
    return null;
  }

  if (!s.match(/^https?:/i)) {
    s = 'http://' + s;

    if (!s.match(ENDS_WITH_MYSHOPIFY)) {
      s += '.myshopify.com';
    }
  }

  var parsedURL = url.parse(s);

  if (!parsedURL) {
    return null;
  }

  // Note that url.parse() converts the hostname to lowercase
  var hostname = parsedURL.hostname;

  if (!hostname.match(ENDS_WITH_MYSHOPIFY)) {
    return null;
  }

  var parts = hostname.split('.');
  if (parts.length !== 3) {
    return null;
  }

  var subdomain = parts[0];

  if (subdomain.length > MAX_SUBDOMAIN_LENGTH) {
    return null;
  }

  if (!subdomain.match(VALID_HOSTNAME_PART)) {
    return null;
  }

  if (options && options.returnHostname) {
    return hostname;
  }

  return subdomain;
};
