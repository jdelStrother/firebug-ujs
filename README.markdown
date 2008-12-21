Firebug UJS
===========

When I'm done with this, it should show up as a panel whenever you inspect an element with Firebug.

In addition to the Style, Layout, & DOM panels, you should have an Events (or UJS) panel that will 
show all of the UJS events bound to the given element and, ideally, the code that will execute when 
those events are triggered.  Ideally, you'll even have the ability to trigger those events, manually.

... anywho ... gots to learn a good bit of FF/Firebug extension development to get this working first ...

Once it does work, I'll put it up on the official Mozilla FF extension site.


some notes
----------

    var events = $.data( $('a.tweet')[0], 'events' ); for (var key in events){ console.log(key); }

    var events = $.data( $('a.tweet')[0], 'events' ); for (var key in events){ console.log(key); for (subkey in events[key]){ console.log(events[key][subkey].toString()); } }
