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
if ( FirebugUJS == null ) {

  console.log('FirebugUJS: loading client-side javascript');

  // global

  var FirebugUJS = {

    event_bound_to_element: function( element, event_type, event_function ) {
      if ( element && event_type && event_function ) {
        if (event_function.the_function != null)
          event_function = event_function.the_function;
        //console.log('event_bound_to_element: ' + element + ':' + event_type + ' => ' + event_function );
        console.log('FirebugUJS: event_bound_to_element: ' + element + ':' + event_type );
        if ( element.getAttribute('ujs') == null )
          element.setAttribute('ujs', '');
        element.setAttribute('ujs', element.getAttribute('ujs') + event_type + ':' + event_function + '|' );
      }
    }

  };

  // jQuery

  if ( window.jQuery ) {
    console.log('FirebugUJS: loading jQuery module');
    jQuery.fn.original_bind = jQuery.fn.bind;

    jQuery.fn.extend({
        bind: function( type, data, fn ) {
          FirebugUJS.event_bound_to_element( this[0], type, data );
          return this.original_bind( type, data, fn );
        }
      });
  }

  // LowPro

  if ( window.Event && window.Event.addBehavior ) {
    console.log('FirebugUJS: loading LowPro module');

    FirebugUJS.LowPro = {
      original: {
        _wrapObserver: window.Event.addBehavior._wrapObserver
      }
    };

    window.Event.addBehavior._wrapObserver = function(observer) {
      var wrapped_observer = FirebugUJS.LowPro.original._wrapObserver(observer);
      wrapped_observer.the_function = (observer.the_function == null) ? observer : observer.the_function;
      return wrapped_observer;
    }

    Event.observe_old = Event.observe;
    Element.addMethods({
        observe: function(element, eventName, handler) {
          FirebugUJS.event_bound_to_element( element, eventName, handler );
          Event.observe_old( element, eventName, handler );
        }		  
      });
  }

  // Prototype

  if ( window.Prototype ) {
    console.log('FiregubUJS: loading Prototype module');

    Event.observe_old = Event.observe;
    Element.addMethods({
        observe: function(element, eventName, handler) {
          FirebugUJS.event_bound_to_element( element, eventName, handler );
          Event.observe_old( element, eventName, handler );
        }		  
      });
  }

}
