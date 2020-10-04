# Bootstrap Content Templates for Squiz Matrix

Bootstrap Content Templates (BCT) is an extension for Squiz Matrix that enables Bootstrap 4 and Fontawesome 5 based Content Template (CT) development as well as an enhanced and more intuitive editing experience for content editors.

The extension consists of a simple loader JS file that when included in the Simple Edit Layout (SEL) of a CT loads additional JS and CSS files to enable Bootstrap CSS & JS and Font Awesome icons in both the Admin and Edit+ interface.

Table of contents:
  * [Installation](#installation)
    + [CDN](#cdn)
    + [Local files](#local-files)
  * [Usage](#usage)
    + [Using Bootstrap classes](#using-bootstrap-classes)
    + [Sidepanel metadata](#sidepanel-metadata)
    + [Sidepanel tabs](#sidepanel-tabs)
    + [Dynamic content updates](#dynamic-content-updates)
      - [Field types](#field-types)
      - [Prepending values](#prepending-values)
      - [data-show-gt](#data-show-gt)
    + [Update hooks](#update-hooks)
  * [Requirements](#requirements)
  * [Support & contributing](#support---contributing)
  * [License](#license)

## Installation

Installation can be done either by loading the files via a CDN or locally.

### CDN

This repo is (currently) automatically synced from the Squiz GitLab instance over to GitHub at [https://github.com/squizlabs/bootstrap-content-templates](https://github.com/squizlabs/bootstrap-content-templates). 

This means any files in the repo are accessible via the [jsDelivr CDN](https://www.jsdelivr.com/) using either a branch or a tag for any of the files. 

For example, to load the latest version of the loader script you can use:

https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@latest/dist/bct-loader.js

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

- Bootstrap 4.4.1 
- Font Awesome 5.5.0
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

### Sidepanel tabs

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

### Dynamic content updates

_This feature requires version 5.5.2.0 of Squiz Matrix as it relies on global keyword support in SEL._

In order to improve the user experience of editing content, you can dynamically update the preview of the content in your SEL as metadata field updates are made.

For example, you might show a preview of the component in your SEL using Bootstrap to help the editor get an idea of what that component will look like on the frontend.

```html
<div 
    class="bct-wrapper" 
    id="bct-wrapper-%asset_assetid%" 
    data-asset-id="%asset_assetid%">

    <div class="mbs">
        <div class="card">
            <div class="card-body">
                <h3>%asset_metadata_cardTitle%</h3>
            </div>
        </div>
    </div>
    
</div>
```

To make this value update dynamically whenever its metadata field is changed, simply add the `data-mid=""` attribute to the HTML element with the ID of the metadata field.

```html
<div 
    class="bct-wrapper" 
    id="bct-wrapper-%asset_assetid%" 
    data-asset-id="%asset_assetid%">

    <div class="mbs">
        <div class="card">
            <div class="card-body">
                <h3 data-mid="%globals_asset_assetid:1234%">%asset_metadata_cardTitle%</h3>
            </div>
        </div>
    </div>

</div>
```

#### Field types

In addition to simple element text values, you can also dynamically update other values. This is controlled via the `data-type` attribute.

The available types include:

* Class: `data-type="class"`
* Background image: `data-type="bg-image"`
* Icon: `data-type="icon"`
    * If the metadata field is a text field, this will add an icon picker to the field.

#### Prepending values

You can use the `data-prepend=""` attribute to always prepend a value to an element when the metadata field is updated.

For example, if you are updating a class on an element, but want other classes to remain, you can use this attribute to always prepend a hardcoded class.

```html
<span  
    data-mid="%globals_asset_assetid:1234%" 
    data-type="class" 
    data-prepend="btn btn-md " 
    class="btn btn-md %asset_metadata_btnStyle%">
```

#### data-show-gt

You can use the `data-show-gt=""` attribute to dynamically show or hide HTML elements if a metadata field value is a certan number value. 

This is useful when you have components with multiple elements on it such as cards, tabs, accordions etc and you want to let editors control how many elements to show on the page (usually done with select field containing number values).

To use, wrap your elements inside a parent element like this:

```html
<div 
    data-mid="%globals_asset_assetid:1234%" 
    data-type="class" 
    data-prepend="bct-show-" class="bct-show-%asset_metadata_amount%">
    ...
</div>
```

Then for each element you want to show/hide, add the `data-show-gt=""` attribute inluding the minimum number required to show that element:

```html
<div class="card" data-show-gt="3 4">
    ...
</div>
```

Now when the associated metadata field's value changes, this element will only show if the value is greater than `3` or `4`.

### Update hooks

You can write custom JS into the SEL that triggers whenever any of the metadata fields inside the sidepanel change.

Update events are triggerd under the custom `bctUpdate` jQuery `.trigger()` event and are attached to each `<div class="bct-wrapper" id="bct-wrapper-%asset_assetid%">` element. 

To capture the event and run your own JS, use the jQuery `.on()` event handler like this:

```html
<script>
setTimeout(function(){ 
    $('#bct-wrapper-%asset_assetid%').on('bctUpdate', function(e, params){
        //your JS code
    }, 100); 
</script>
```
_Note that we have to wrap this in `setTimeout()` due to the way Matrix loads the DOM of the screen after a save event._

An object containing useful information about the event is passed to the `trigger` event as follows:

```javascript
$container.trigger('bctUpdate', {
    'input':        input,          //input field element (object)
    'containerId':  containerId,    //asset id of the content container (string)
    'inputId':      inputId,        //id of the metadata input field
    'value':        value           //the value of the metadata field (string)
});
```

## Requirements

* Squiz Matrix version 5.5
* Any browser that [Squiz Matrix supports](https://matrix.squiz.net/resources/requirements#web-browser-support) 

## Support & contributing

Anyone is welcome to contribute bug fixes, features, and improvements.

## License

The code is available under the [MIT license](LICENSE).

This repo is based on [https://github.com/ericalli/static-site-boilerplate](https://github.com/ericalli/static-site-boilerplate).


