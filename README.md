# Bootstrap Content Templates for Squiz Matrix

Bootstrap Content Templates (BCT) is an extension for Squiz Matrix that enables Bootstrap 4 and Fontawesome 5 based Content Template (CT) development as well as an enhanced and more intuitive editing experience for content editors.

The extension consists of a simple loader JS file that when included in the Simple Edit Layout (SEL) of a CT loads additional JS and CSS files to enable Bootstrap 4 CSS & JS and Font Awesome 5 icons in both the Admin and Edit+ interface.

## Installation

Installation can be done either by loading the files via a CDN or locally.

### CDN

This repo is (currently) automatically synced from the Squiz GitLab instance over to GitHub at [https://github.com/squizlabs/bootstrap-content-templates](https://github.com/squizlabs/bootstrap-content-templates). 

This means any files in the repo are accessible via the [jsDelivr CDN](https://www.jsdelivr.com/) using either a branch or a tag for any of the files. 

For example, to load the master branch version of the loader script you can simply use:

[`https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@master/dist/bct-loader.js`](https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@master/dist/bct-loader.js)

### Local files

The alternative is to download the CSS and JS files from the `/dist/` directory and upload them to your Squiz Matrix instance and reference them from there. 

If you do, you'll just need to update the `bct-loader.js` file to change the references to the CSS and JS files so that they are also not loaded from the CDN.

```javascript
var bctCssMin = 'path/to/bct.min.css';
var bctJsMin = 'path/to/bct.min.js';
```

## Usage

In order to use this extension on a CT, simply include the `bct-loader.js` file to the end of your SEL:

```html
<script src="/path/to/bct-loader.js"></script>
```

This will automatically load the following libraries into your Admin or Edit+ interface when this CT is used on a page:

- Bootstrap 4 
- Font Awesome 5
- BCT core CSS & JS

The loader script will ensure that these additional CSS and JS files are only loaded once, so it's fine if you have multiple CTs on a page that all reference the same loader script.

### Using Bootstrap classes

Bootstrap is prefixed with the `.mbs` class, so you just need to wrap any HTML elements that use Boostrap in an element with that class on it. For example:

```html
<div class="mbs">
    <div class="row text-center bg-primary">
        ...
    </div>
</div>
```

You can use Font Awesome 5 classes and icons as per normal.

### Sidepanel metadata

This is where the extension is most useful, as it can take the default output of the Metadata fields of a CT and put them in a sidepanel of the editing interface where they don't distract or clutter up the main editing content area.

To do this, you just have to write the markup for the SEL in a certain way:

```html
<div class="bct-wrapper" id="bct-wrapper-%asset_assetid%" data-asset-id="%asset_assetid%">

    <div class="bct-metadata" style="display:none;">
        %metadata-F_metadata_values%
    </div>

    %__custom-contents%

</div><!--.bct-wrapper-->

<script src="/path/to/bct-loader.js"></script>
```

This will add a button next to the container: 

![](/docs/edit-component-button.jpg)

When clicked, it'll open a sidepanel from the right where everything inside the`<div class="bct-metadata">` will be visible.

![](/docs/sidepanel-open.jpg)

### Sidepanel Tabs

You can group content within the sidepanel into tabs to allow for better separation and digestion of metadata fields. This is useful when you want to split Metadata Sections into separate tab panels for easier editing.

To do so, simply wrap the tab content inside `<div class="bct-tab-pane">` divs and use the `data-name=""` attribute to specify the name for the tab. Put all tabs inside a parent wrapping `<div class="bct-tabs">` div.

```html
<div class="bct-metadata" style="display:none;">
    <div class="bct-tabs">
        <div class="bct-tab-pane active" data-name="Content">
            %metadata-F_section_1111_values%
        </div>
        <div class="bct-tab-pane" data-name="Settings">
            %metadata-F_section_2222_values%
        </div>
    </div>
</div>
```
This will create tabs like this:

![](/docs/sidepanel-open-tabs.jpg)


### Content preview changes

_TODO_

### Dynamic content updates

_TODO_

### Update hooks

_TODO_

## Browser support

Same as the official Squiz Matrix browser support list for version 5.5. See [https://matrix.squiz.net/resources/requirements#web-browser-support](https://matrix.squiz.net/resources/requirements#web-browser-support). 

## Support & contributing

Anyone is welcome to contribute. If you decide to get involved, please take a moment and check out the following:

* [Bug reports](#)
* [Feature requests](#)

## License

The code is available under the [MIT license](LICENSE).

This repo is based on [https://github.com/ericalli/static-site-boilerplate](https://github.com/ericalli/static-site-boilerplate).
