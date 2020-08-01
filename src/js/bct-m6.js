//function for initialising a content template instance
function bctInit(theWrapper) { // eslint-disable-line no-unused-vars
  var $bctWrapper = $(theWrapper);
  var assetId = $bctWrapper.data('asset-id');
  var $bctMetadata = $($bctWrapper.find('.bct-metadata'));
  $bctMetadata.show();

  //add metadata toggle button
  $bctMetadata.before(`
    <span data-tippy-tooltip="Edit component fields" data-tippy-position="top" class="bct-metadata-toggle btn btn-icon btn-default btn-icon-solo" id="metadata-toggle-${assetId}" onclick="bctToggleMetadataPanel(${assetId})">
      <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
    </span>
  `);

  //add metadata close button
  $bctMetadata.prepend(`
    <button data-tippy-tooltip="Close panel" data-tippy-position="top" class="bct-metadata-close btn btn-icon btn-icon-solo btn-default-transparent" type="button" aria-label="Close panel" onclick="bctCloseMetadataPanel(${assetId})">
      <svg class="icon " aria-hidden="true" focusable="false" aria-label="icon-close"><use href="/__lib/frontend/dist/images/symbol-defs.svg#icon-close"></use></svg>
    </button>
  `);

  //add on change events to metadata fields to update component previews
  $bctMetadata.find('.sq-form-field').on('change keyup', function(){
      bctUpdateComponent(this);
  });

  //initialise icon pickers on metadata text fields
  $bctWrapper.find('i[data-type="icon"]').each(function(){
      var metadataId = $(this).data('mid');
      $('#container_'+ assetId +'_metadata_field_text_'+ metadataId +'_value').iconpicker({
          animation: false,
          selectedCustomClass: 'bg-primary text-light',
          templates: {
              popover: '<div class="mbs" style="display: none;"><div class="iconpicker-popover popover shadow" x-placement="bottom bs-popover-bottom"><div class="arrow"></div>' +
                  '<div class="popover-title"></div><div class="popover-content"></div></div></div>',
          }
      }).on('iconpickerSelected', function(){
          bctUpdateComponent(this);
      });
  });

  //initialise wysiwyg change events
  $bctMetadata.find('.htmlarea-div').each(function(){
      var $wysiwyg = $(this);
      $wysiwyg.on('keydown change blur focus', function() {
          console.log($wysiwyg.attr('id'));
          bctUpdateComponent(this);
      });
  });

  //ini bct tabs
  bctIniTabs(theWrapper);

  //open panels that are supposed to be open on screen load
  if($('body').hasClass('bct-metadata-open')){
      bctOpenMetadataPanel($('body').attr('data-open-metadata'));
      //open any metadata tabs that are supposed to be open
      if($('body').data('open-metadata-tab')){
          $('#'+$('body').data('open-metadata-tab')).tab('show');
      }
  }

  //add class to this container to indicate that it has been initialised
  $bctWrapper.addClass('initialised');
}


//function for initialising metadata tabs if there are any
function bctIniTabs(theWrapper){
  var $bctWrapper = $(theWrapper);
  var assetId = $bctWrapper.data('asset-id');
  var $tabs = $bctWrapper.find('.bct-tabs');
  if($tabs){
      //add the markup for the nav
      $tabs.prepend('\
          <div class="mbs">\
              <ul class="nav nav-tabs m-0 p-2 pb-0 border-0">\
              </ul>\
          </div>\
      ');
      //assign the newly created nav to a variable
      var $nav = $tabs.find('.nav-tabs');
      //for each tab pane, add a nav item
      $tabs.find('.bct-tab-pane').each(function(i){
          var name = $(this).data('name');
          $nav.append('\
              <li class="nav-item">\
                  <a class="nav-link '+ ($(this).hasClass('active') ? 'active' : '') +'" data-toggle="tab" id="tab'+ i + '-' + assetId + '" href="#panel'+ i +'-'+ assetId +'">'+ name +'</a>\
               </li>\
          ');
          $(this).attr('id','panel'+ i +'-'+ assetId);
      });

      //add additional events when tab is activated
      $nav.find('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
          //set current active tab as data attribute on body tag
          bctActiveMetadataTab(e.target.id)
      });
  }
}

//function for setting the active metadata tab state in the body tag
function bctActiveMetadataTab(tabId){
  // var tabId = tabId;
  $('body').attr('data-open-metadata-tab', tabId);
}

//function for toggling the metadata panel open and close
function bctToggleMetadataPanel(assetId) { // eslint-disable-line no-unused-vars
  //if there is already one open, either close the current one or open a new one
  if($('body').hasClass('bct-metadata-open')){
      //this means there's already one open
      if($('body').attr('data-open-metadata') == assetId){
          //if the clicked asset ID is open, just close it
          bctCloseMetadataPanel(assetId);
      }else{
          //else, close any opened ones and open a new one
          bctCloseMetadataPanel($('body').attr('data-open-metadata'));
          bctOpenMetadataPanel(assetId);
      }
  }else{
      //else just open a new one
      bctOpenMetadataPanel(assetId);
  }
}

//function for opening the metadata sidepanel
function bctOpenMetadataPanel(assetId){
  //remove open class from any other metadata panels
  $('.bct-wrapper').not('#bct-wrapper-'+assetId).find('.bct-metadata').removeClass('open');
  //add the open class to the clicked metadata panel (this opens it)
  $('#bct-wrapper-'+assetId).find('.bct-metadata').addClass('open');
  $('#metadata-toggle-'+assetId).addClass('active');
  //set active metadata panel state in the body tag
  $('body').addClass('bct-metadata-open');
  $('body').attr('data-open-metadata', assetId);
}

//function for closing the metadata sidepanel
function bctCloseMetadataPanel(assetId){
  //remove open class from all metadata panels
  $('.bct-metadata').removeClass('open');
  $('#metadata-toggle-'+assetId).removeClass('active');
  //set state in body tag to indicate that no panels are open
  $('body').removeClass('bct-metadata-open');
  $('body').attr('data-open-metadata', '');
}

//function for updating the component preview content when metadata is changed
function bctUpdateComponent(input){
  var $theInput = $(input);
  var $metadataInputWrapper = $theInput.closest('.sq-metadata-wrapper');
  if($theInput.attr('id') != undefined){
      var type = input.type;
      var ids = $theInput.attr('id').replace(/\D+/g,',').split(',');
      var containerId = ids[1];
      var inputId = ids[2];
      var $container = $('#bct-wrapper-'+ containerId);
      var isDefaultCheckbox = $theInput.hasClass('defaultCheckbox');

      //get the value
      var value = '';
      if(isDefaultCheckbox){
          //if it's the default checkbox that was changed, we need to get the value differently
          value = $metadataInputWrapper.find('.sq-metadata-contents-wrapper > .sq-form-field').val();
      }else if($theInput.hasClass('htmlarea-div')){
          //the input is a wysiwyg
          value = $theInput.html();
      }else if(type == 'checkbox'){
          //input is a checkbox field
          if(input.checked){
              value = $theInput.val();
          }
      }else{
          //standard text or select field input
          value = $theInput.val();
      }

      //handle checkbox inputs
      if(type == 'checkbox'){
          //if the input is a checkbox, then the target ID needs the value as well
          inputId += '_' + $theInput.val();
      }

      //get the element we're going to update
      var $element = $container.find('[data-mid="'+ inputId +'"]');

      //add prepend value if it's available
      var prependVal = '';
      if($element.data('prepend')){
          prependVal = $element.data('prepend');
      }

      //update the component with the value
      if($element.data('type') == 'icon'){
          //fontawesome icon
          $element.attr('class', value);
      }else if($element.data('type') == 'class'){
          //class
          $element.attr('class', prependVal + value);
      }else if($element.data('type') == 'class'){
          //class
          $element.attr('class', prependVal + value);
      }else if($theInput.hasClass('htmlarea-div')){
          //wysiwyg
          $element.html(value);
      }else{
          //normal input value
          $element.text(value);
      }

      // Broadcast update event for any event listeners
      $container.trigger('bctUpdate', {
          'input': input,
          'containerId': containerId,
          'inputId': inputId,
          'value': value
      });
  }
}

//function for updating the component preview when related asset metadata is changed
function bctUpdateComponentRelatedAsset(wrapperDiv){
  var $relatedFieldWrapper = $(wrapperDiv);
  var value = $relatedFieldWrapper.find("input[id*='value[0][assetid]']").val();
  var ids = $relatedFieldWrapper.attr('id').replace(/\D+/g,',').split(',');
  var containerId = ids[1];
  var inputId = ids[2];
  var $container = $('#bct-wrapper-'+ containerId);
  var $element = $container.find('[data-mid="'+ inputId +'"]');
  //var isDefaultCheckbox = $theInput.hasClass('defaultCheckbox');

  var prependVal = '';
  //add prepend value if it's available
  if($element.data('prepend')){
      prependVal = $element.data('prepend');
  }

  if($element.is('img')){
      //image tag
      if(value > 0){
          $element.attr('src', './?a='+value).show();
      }else{
          $element.attr('src', '').hide();
      }
  }else if($element.data('type') == 'bg-image'){
      //background image
      $element.css('background-image', prependVal + ' url(./?a='+ value +')');
  }else{
      //normal input value
      $element.text(value);
  }

}

