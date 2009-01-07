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

	console.log('loading firebug-ujs client-side library ...');

	// global

	var FirebugUJS = {

	  event_bound_to_element: function( element, event_type, event_function ) {
	    if (event_function.the_function != null)
		event_function = event_function.the_function;
	    console.log('event_bound_to_element: ' + element + ':' + event_type + ' => ' + event_function );
	    //console.log('event_function.the_function => ' + event_function.the_function );
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
	  console.log('loading FirebugUJS jQuery module');
	  jQuery.fn.original_bind = jQuery.fn.bind;

	  jQuery.fn.extend({
	    bind: function( type, data, fn ) {
	      FirebugUJS.event_bound_to_element( this[0], type, data );
	      this.original_bind( type, data, fn );
	    }
	  });
	}

	// LowPro
	
	if ( window.Event && window.Event.addBehavior ) {
	  console.log('loading FirebugUJS LowPro module');
	  
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
	      // console.log( element + '.' + eventName + ' => ' + handler.the_function );
	      FirebugUJS.event_bound_to_element( element, eventName, handler );
	      Event.observe_old( element, eventName, handler );
	    }		  
	  });
	}

	// Prototype
	//
/*
	if ( window.Prototype ) {
	  console.log('loading FirebugUJS Prototype module');
	  FirebugUJS.prototype_original_observe = Event.observe;
	  FirebugUJS.prototype_original_e_observe = Element.observe;

	  Event.observe = function( element, eventName, handler ) {
		FirebugUJS.event_bound_to_element( element, eventName, handler );
		FirebugUJS.prototype_original_observe( element, eventName, handler );
	  };
	  Element.observe = function( element, eventName, handler ) {
		FirebugUJS.event_bound_to_element( element, eventName, handler );
		FirebugUJS.prototype_original_e_observe( element, eventName, handler );
	  };

	  Object.extend(Event, (function() {
		  return {
		    observe: function(element, eventName, handler) {
                      console.log('HELLO FROM THE Event.observe crazy function');
		      element = $(element);
		      var name = getDOMEventName(eventName);

		      var wrapper = createWrapper(element, eventName, handler);
		      if (!wrapper) return element;

		      if (element.addEventListener) {
			element.addEventListener(name, wrapper, false);
		      } else {
			element.attachEvent("on" + name, wrapper);
		      }    

		      return element;
		    }
		}
	  }));
	}
*/

	// hook into Event.observe but also see if this can be done via overriding the native events ... !
	console.log('done!  loaded firebug-ujs client-side library.');

}
