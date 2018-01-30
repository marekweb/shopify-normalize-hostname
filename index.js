const VALID_HOSTNAME_PART = /^[a-z0-9][a-z0-9-]*$/i;
const MAX_SUBDOMAIN_LENGTH = 63;
const ENDS_WITH_MYSHOPIFY = /\.myshopify.com$/i;

const url = require('url');

module.exports = function shopifyNormalizeHostname(s, options = {}) {
  if (!s || typeof s !== 'string') {
    return null;
  }

  if (!s.match(/^https?:/i)) {
    // This is just to build a full url that can be parsed by url.parse
    s = 'http://' + s;

    if (!s.match(ENDS_WITH_MYSHOPIFY)) {
      s += '.myshopify.com';
    }
  }

  const parsedURL = url.parse(s);

  if (!parsedURL) {
    return null;
  }

  // Note that url.parse() converts the hostname to lowercase
  const hostname = parsedURL.hostname;

  if (!hostname.match(ENDS_WITH_MYSHOPIFY)) {
    return null;
  }

  const parts = hostname.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const subdomain = parts[0];

  if (subdomain.length > MAX_SUBDOMAIN_LENGTH) {
    return null;
  }

  if (!subdomain.match(VALID_HOSTNAME_PART)) {
    return null;
  }

  if (!options.returnSubdomain) {
    return hostname;
  }

  return subdomain;
};
