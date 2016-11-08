var test = require('tape');
var f = require('./index');

test('return null with null or undefined input', function (t) {
  t.equal(f(null), null);

  t.equal(f(), null);

  t.end();
});

test('return null with empty string', function (t) {
  t.equal(f(''), null);
  t.end();
});

test('valid hostname should return shop name', function (t) {
  t.equal(
    f('fancy-widgets.myshopify.com'),
    'fancy-widgets'
  );

  t.equal(
    f('fancy-widgets.myshopify.com', true),
    'fancy-widgets.myshopify.com'
  );

  t.end();
});

test('hostname with invalid characters should return null', function (t) {
  t.equal(f('fancy_widgets'), null);
  t.equal(f('fancy widgets'), null);
  t.equal(f('fancy*widgets'), null);

  t.end();
});

test('hostname with duplicate myshopify.com should return null', function (t) {
  t.equal(f('fancy-widgets.myshopify.com.myshopify.com'), null);

  t.end();
});

test('hostname starting with a hyphen should return null', function (t) {
  t.equal(f('-widgets.myshopify.com'), null);

  t.end();
});

test('hostname with extra subdomains should return null', function (t) {
  t.equal(f('fancy.widgets.myshopify.com'), null);

  t.equal(f('fancy.widgets'), null);

  t.end();
});

test('myshopify.com should return null', function (t) {
  t.equal(f('myshopify.com'), null);
  t.end();
});

test('other domain should return null', function (t) {
  t.equal(f('example.com'), null);
  t.end();
});

test('hostname with trailing dot should return null', function (t) {
  t.equal(f('fancy-widgets.myshopify.com.'), null);

  t.end();
});

test('url without myshopify.com should return null', function (t) {
  t.equal(f('http://localhost'), null);

  t.end();
});

test('hostname with uppercase letters should be normalized to lowercase', function (t) {
  t.equal(f('Fancy-Widgets.MyShopify.com'), 'fancy-widgets');

  t.equal(f('Fancy-Widgets.MyShopify.com', true), 'fancy-widgets.myshopify.com');

  t.end();
});

test('hostname which is too long should return null', function (t) {
  t.equal(f('this-is-a-long-hostname-which-is-longer-than-the-maximum-accepted-length.myshopify.com'), null);

  t.end();
});

test('url with http should return normalized value', function (t) {
  t.equal(
    f('http://shiny-trinkets.myshopify.com'),
    'shiny-trinkets'
  );

  t.equal(
    f('http://shiny-trinkets.myshopify.com', true),
    'shiny-trinkets.myshopify.com'
  );

  t.end();
});

test('url with https should return normalized value', function (t) {
  t.equal(
    f('https://shiny-trinkets.myshopify.com'),
    'shiny-trinkets'
  );

  t.equal(
    f('https://shiny-trinkets.myshopify.com', true),
    'shiny-trinkets.myshopify.com'
  );

  t.end();
});

test('url with a path should return normalized value', function (t) {
  t.equal(
    f('http://shiny-trinkets.myshopify.com/admin/apps'),
    'shiny-trinkets'
  );

  t.equal(
    f('http://shiny-trinkets.myshopify.com/admin/apps', true),
    'shiny-trinkets.myshopify.com'
  );

  t.end();
});
