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


i need to include a javascript file on the client side ...
----------------------------------------------------------

for this, try something like ... (try this with an html page & an image first) ...

    (10:49:17 AM) remitaylor: is there a way to get the filesystem path to your firefox extension?  (from the extension .js)
    (10:49:41 AM) [DA]Xel|AWAY: well using chrome manifest
    (10:49:48 AM) [DA]Xel|AWAY: you can set your content path
    (10:49:53 AM) [DA]Xel|AWAY: and use chrome uri's 
    (10:50:07 AM) [DA]Xel|AWAY: chrome://WHATEVERYOUCALLEDYOURCONTENT/content/
    (10:50:11 AM) [DA]Xel|AWAY: and you are there :)
    (10:51:19 AM) remitaylor: so, for example, if i embedded a html page in my xpi and i wanted to be able to direct the user to it on some event (to file:///...foo.html) ... is there a way i could get the extension path to do something like that?
    (10:52:44 AM) [DA]Xel|AWAY: window.open("chrome://foo/content/bar.html", "My HTML Page", "chrome");
    (10:52:56 AM) [DA]Xel|AWAY: or...
    (10:53:01 AM) Ratty left the room (quit: Quit: ChatZilla 0.9.83 [SeaMonkey 1.5a/2007052909]).
    (10:53:23 AM) [DA]Xel|AWAY: var tBrowser = top.document.getElementById('content');
    (10:53:43 AM) [DA]Xel|AWAY: tBrowser.addTab("chrome://foo/content/bar.html");
    (10:54:19 AM) remitaylor: sweetness, thanks - imma try that!
