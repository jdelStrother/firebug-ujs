/*
 * Hook into the UJS event binding methods for different javascript libraries.
 *
 * I'll start with jQuery.
 *
 * ( No, there isn't any way to enumerate over the native browser events )
 *
 */

// global

var a_global_variable = 5;

// jQuery

FirebugUJS = { };

if ( window.jQuery ) {
  FirebugUJS.jQuery = {

    bindings_element: document.createElement("FirebugUJS_jQuery_Bindings"),

    bind_original: jQuery.fn.bind,

    bindings: { },

    bind: function ( type, data ) {
      var the_element = this[0];
      console.log('binding [' + the_element + '].' + type + ': ' + data);

      //element.setAttribute("attribute1", "first attr");
      //element.setAttribute("attribute2", "the second");
      //document.documentElement.appendChild(element);

      if ( FirebugUJS.jQuery.bindings[ the_element ] == null ) 
        FirebugUJS.jQuery.bindings[ the_element ] = {};

      if ( FirebugUJS.jQuery.bindings[ the_element ][ type ] == null ) 
        FirebugUJS.jQuery.bindings[ the_element ][ type ] = [];

      // this uses the actual function object, which is great, but doesn't toJSON very well  :/
      // FirebugUJS.jQuery.bindings[ the_element ][ type ][ FirebugUJS.jQuery.bindings[ the_element ][ type ].length ] = data;

      FirebugUJS.jQuery.bindings[ the_element ][ type ][ FirebugUJS.jQuery.bindings[ the_element ][ type ].length ] = data.toString();
    }
  };

  jQuery.fn.bind = FirebugUJS.jQuery.bind;
}

// Prototype
