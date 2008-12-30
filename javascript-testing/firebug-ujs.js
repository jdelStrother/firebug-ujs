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

// global

var FirebugUJS = {

  event_bound_to_element: function( element, event_type, event_function ) {
    if ( element.getAttribute('ujs') == null )
         element.setAttribute('ujs', '');
    element.setAttribute('ujs', element.getAttribute('ujs') + event_type + ':' + event_function + '|' );
  }

};

// native

/*
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
*/

// jQuery

if ( window.jQuery ) {
  jQuery.fn.original_bind = jQuery.fn.bind;

  jQuery.fn.extend({
    bind: function( type, data, fn ) {
      FirebugUJS.event_bound_to_element( this[0], type, data );
      this.original_bind( type, data, fn );
    }
  });
}
