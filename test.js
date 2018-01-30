const f = require('./index');

test('return null with null or undefined input', () => {
  expect(f(null)).toBe(null);

  expect(f()).toBe(null);
});

test('return null with empty string', () => {
  expect(f('')).toBe(null);
});

test('valid hostname should return shop name', () => {
  expect(f('fancy-widgets.myshopify.com', { returnSubdomain: true })).toBe(
    'fancy-widgets'
  );

  expect(f('fancy-widgets.myshopify.com')).toBe('fancy-widgets.myshopify.com');
});

test('hostname with invalid characters should return null', () => {
  expect(f('fancy_widgets')).toBe(null);
  expect(f('fancy widgets')).toBe(null);
  expect(f('fancy*widgets')).toBe(null);
});

test('hostname with duplicate myshopify.com should return null', () => {
  expect(f('fancy-widgets.myshopify.com.myshopify.com')).toBe(null);
});

test('hostname starting with a hyphen should return null', () => {
  expect(f('-widgets.myshopify.com')).toBe(null);
});

test('hostname with extra subdomains should return null', () => {
  expect(f('fancy.widgets.myshopify.com')).toBe(null);

  expect(f('fancy.widgets')).toBe(null);
});

test('myshopify.com should return null', () => {
  expect(f('myshopify.com')).toBe(null);
});

test('other domain should return null', () => {
  expect(f('example.com')).toBe(null);
});

test('hostname with trailing dot should return null', () => {
  expect(f('fancy-widgets.myshopify.com.')).toBe(null);
});

test('url without myshopify.com should return null', () => {
  expect(f('http://localhost')).toBe(null);
});

test('hostname with uppercase letters should be normalized to lowercase', () => {
  expect(f('Fancy-Widgets.MyShopify.com', { returnSubdomain: true })).toBe(
    'fancy-widgets'
  );

  expect(f('Fancy-Widgets.MyShopify.com')).toBe('fancy-widgets.myshopify.com');
});

test('hostname which is too long should return null', () => {
  expect(
    f(
      'this-is-a-long-hostname-which-is-longer-than-the-maximum-accepted-length.myshopify.com'
    )
  ).toBe(null);
});

test('url with http should return normalized value', () => {
  expect(
    f('http://shiny-trinkets.myshopify.com', { returnSubdomain: true })
  ).toBe('shiny-trinkets');

  expect(f('http://shiny-trinkets.myshopify.com')).toBe(
    'shiny-trinkets.myshopify.com'
  );
});

test('url with https should return normalized value', () => {
  expect(
    f('https://shiny-trinkets.myshopify.com', { returnSubdomain: true })
  ).toBe('shiny-trinkets');

  expect(f('https://shiny-trinkets.myshopify.com')).toBe(
    'shiny-trinkets.myshopify.com'
  );
});

test('url with a path should return normalized value', () => {
  expect(
    f('http://shiny-trinkets.myshopify.com/admin/apps', {
      returnSubdomain: true
    })
  ).toBe('shiny-trinkets');

  expect(f('http://shiny-trinkets.myshopify.com/admin/apps')).toBe(
    'shiny-trinkets.myshopify.com'
  );
});
