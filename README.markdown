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


communicating between extension and pages
-----------------------------------------

from the extension, we have access to the DOM element but we don't have a way to get it via a CSS selector 
or any way that we can share between both the page and the extension (that i know of)

essentially, we need a unique ID for the element, allowing us to access it via both the extension and 
the page.

the ideal solution here would be to set some CDATA on an element to JSON that the extension can then read 
in, but JSON gets eval'd into objects ... making a major security risk

... we can some up with a proprietary way of adding elements to the DOM representing the events which 
the extension knows how to read, but ... how do we get from the DOM element (in the extension) to the 
right element with the data that we want?

try to find a way of hashing elements that results in the same *unique* ID for both the element and the page?

... for now, i'm going to try using JSON and seeing if there's a SAFE way to eval it.  when i'm not on an airplane, 
i can hopefully see if there's a library for safely eval'ing json to js objects (sans any code execution)

AH HA.

let's add an attribute to each of the elements that has events, adding our *OWN* unique identifier.  we can 
use that as a pointer to the events!  not perfect ... i hate custom HTML attributes ... but it'll work!


release notes
-------------

when i release, be sure to give resources and credit where it's due, and notes for howto make it better

mention the great IRC people, by name - awesome folks in the #extdev channel!

also all of the url references ... projects' source that was helpful to look at, etc.

small project, but this stuff might help someone else!

i need to style things!
-----------------------

find out how to *properly* get .css working and associated with my overlay(?) or elements?

... for now, i suppose i could do things without CSS and then release and *then* try to get CSS working

get jquery working
------------------

meh, this isn't truly necessary, but it could help to clean up the code a bit

release!
--------

really, it's basically good for release now, atleast for jquery.  try getting it working with prototype and/or 
natively bound events and i'll be good  :)

for now, remove the native binding code and release just for jquery
