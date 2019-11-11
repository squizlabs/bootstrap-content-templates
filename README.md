# Bootstrap Content Templates for Squiz Matrix

Bootstrap Content Templates (BCT) is an extension for Squiz Matrix that enables Bootstrap 4 and Fontawesome 5 based Content Template development as well as an enhanced and more intuitive editing experience for content editors.

The extension consists of a simple loader JS file that when included in the Simple Edit Layout of a Content Template, it loads an additional JS and CSS file to enable Bootstrap 4 CSS, JS and Fontawesome 5 icons in both the Admin and Edit+ interface.

## Installation

Installation can be done in multiple ways:

### CDN

### Download Files

## Usage

In order to use on a Content Template, add the `bct-loader.js` file to the end of your Simple Edit Layout like this:

```html
<script src="bct-loader.js"></script>
```

This will automatically load the following libraries into your Admin or Edit+ interface when this Content Template is used:

- Bootstrap 4 

- Fontawesome 5

## Browser Support

Same as the official Squiz Matrix browser support list for version 5.5. See [https://matrix.squiz.net/resources/requirements#web-browser-support](https://matrix.squiz.net/resources/requirements#web-browser-support). 

## Support & Contributing

Anyone is welcome to contribute. If you decide to get involved, please take a moment and check out the following:

* [Bug reports](#)
* [Feature requests](#)

## License

The code is available under the [MIT license](LICENSE).

This repo is based on [https://github.com/ericalli/static-site-boilerplate](https://github.com/ericalli/static-site-boilerplate).
