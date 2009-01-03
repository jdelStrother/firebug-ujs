/*
 * FirebugUJS Client-side Library
 *
 *
 * Overview:
 *
 *   To keep track of DOM elements that have events bound to them, 
 *   we override the event binding method(s) used by different 
 *   javascript libraries and keep track of the DOM elements and 
 *   the events that get bound to them.
 *
 *   To do this (and to make this information safely accessible to 
 *   the firefox extension), we add a custom attribute to all DOM 
 *   elements with events, which holds the event information.
 *
 *
 * To Do:
 *
 *   Instead of overriding the event binding methods of different 
 *   javascript libraries, we should try to override the native 
 *   javascript functions, if possible, so this is more library agnostic.
 *
 */
alert('loading firebug-ujs client-side library ...');

// global

var FirebugUJS = {

  event_bound_to_element: function( element, event_type, event_function ) {
    alert('event_bound_to_element: ' + element + ', ' + event_type);
    if ( element.getAttribute('ujs') == null )
         element.setAttribute('ujs', '');
    element.setAttribute('ujs', element.getAttribute('ujs') + event_type + ':' + event_function + '|' );
  }

};

// native

// GET THIS WORKING!
FirebugUJS.native = {
  window_addEventListener_original: window.addEventListener,
  document_addEventListener_original: document.addEventListener,

  window_EventListener: function( type, proc, bool ) {
    FirebugUJS.event_bound_to_element( this, type, proc );
    FirebugUJS.native.window_addEventListener_original( type, proc, bool );
  },
  document_addEventListener: function( type, proc, bool ) {
    FirebugUJS.event_bound_to_element( this, type, proc );
    FirebugUJS.native.document_addEventListener_original( type, proc, bool );
  }
};
window.addEventListener = FirebugUJS.native.window_addEventListener;
document.addEventListener = FirebugUJS.native.document_addEventListener;

// jQuery

if ( window.jQuery ) {
  alert('loading FirebugUJS jQuery module');
  jQuery.fn.original_bind = jQuery.fn.bind;

  jQuery.fn.extend({
    bind: function( type, data, fn ) {
      FirebugUJS.event_bound_to_element( this[0], type, data );
      this.original_bind( type, data, fn );
    }
  });
}

// Prototype

// hook into Event.observe but also see if this can be done via overriding the native events ... !
alert('done!  loaded firebug-ujs client-side library.');
