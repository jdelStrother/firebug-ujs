FirebugUJS
==========

Firebug extension for displaying Unobtrusive Javascript bound to DOM elements.

[Introductory Blog Post](http://remi.org/2009/01/06/using-firebug-to-debug-unobtrusive-javascript.html)

![FirebugUJS Screenshot](http://github.com/remi/firebug-ujs/raw/master/images/screenshot.png)

    more documentation coming soon

[Download FirebugUJS](http://github.com/remi/firebug-ujs/raw/master/firebug-ujs.xpi)


TODO
----

 * create selenium tests
 * clean-up [FirebugUJS.js][js] 
   * need the selenium tests first so i can "refactor ruthlessly"
 * add options for the extension, so i can enable/disable things, including:
   * the whole extension
   * console logging / debugging for the extension
 * make it easy to see ALL of the UJS events on a given page
   * maybe even show the total count somewhere visible "15 JS Events"
 * switch ujs="events" back to ujs="unique id"


[js]: http://github.com/remi/firebug-ujs/tree/master/firebug-ujs/chrome/firebugUJS/FirebugUJS.js
