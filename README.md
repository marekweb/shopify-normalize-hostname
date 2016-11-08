# Normalize Shopify Hostnames

This module takes an input string and returns the normalized Shopify store hostname, or alternatively just the store subdomain, or null if the input is not valid.

Valid input examples:

- `fancy-widgets`
- `fancy-widgets.myshopify.com`
- `https://fancy-widgets.myshopify.com`
- `https://fancy-widgets.myshopify.com/some/path`

Output for the above:

- Hostname: `fancy-widgets.myshopify.com`
- Subdomain: `fancy-widgets`

The store hostname can always be re-created from the store subdomain by appending `.myshopify.com`.

## Usage

```ts
normalizeOutput(hostname: string, returnFullHostname: boolean): string;
```

```js
var normalizeOutput = require('shopify-normalize-output');

normalizeHostname('fancy-widgets.myshopify.com');
// Output: "fancy-widgets"

normalizeHostname('fancy-widgets.myshopify.com', true);
// Output: "fancy-widgets.myshopify.com"
```

## Background: Shopify Store Hostnames

Each Shopify store is uniquely identified by a **hostname** which consists of a subdomain on the `myshopify.com` domain.

This is true regardless of whether the store has its own custom domain. It's always identified by a `myshopify.com` hostname behind the scenes.

Here are examples of store hostnames:

- `shiny-trinkets.myshopify.com`
- `fancy-widgets.myshopify.com`
- `tattly.myshopify.com`

When dealing with the Shopify API, this hostname is the primary way to identify a store. It's used in URLs like these:

- The API endpoints like `https://{hostname}/admin/products.json`
- The OAuth authorization page at `https://{hostname}/admin/oauth/authorize`
- The admin interface for a store at `https://{hostname}/admin`
- The admin interface of an app within a store at `https://{hostname}/admin/apps/{api-key}`
- ScriptTags URL which are automatically loaded with the hostname as a query parameter, like `https://example.com/script.js?shop={hostname}`

Because the `myshopify.com` part is always the same, you can store just the **subdomain** of the hostname as the identifier.

## Definition of Valid Hostname

Here's how the Shopify documentation defines a valid hostname:

> Ensure the provided hostname parameter is a [valid hostname](https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names), ends with myshopify.com, and does not contain characters other than letters (a-z), numbers (0-9), dots, and hyphens.
