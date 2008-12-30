FBL.ns( function() { with (FBL) { 

	Firebug.FirebugUJS = extend(Firebug.Module, { 

	  shutdown: function() {
	    if(Firebug.getPref('defaultPanelName')=='FirebugUJS') {
	      /* Optional */
	      Firebug.setPref('defaultPanelName','console');
	    }
	  },

	  showPanel: function(browser, panel) { 
	    var isFirebugUJS = panel && panel.name == "FirebugUJS"; 
	    var FirebugUJSButtons = browser.chrome.$("fbFirebugUJSButtons"); 
	    collapse(FirebugUJSButtons, !isFirebugUJS); 
	  }, 

	  button1: function() { 
	    FirebugContext.getPanel("FirebugUJS").printLine('well hello there!'); 
	    // FirebugContext.getPanel
	    // parentPanel [string, int], [string, 4]: html ...
	    FirebugContext.getPanel("FirebugUJS").printLine( FirebugContext.getPanel('html') ); 
	  }, 

	  button2: function() { 
	    FirebugContext.getPanel("FirebugUJS").printLine('Clicked Button 2'); 
		
		//var tBrowser = top.document.getElementById("content");
		//var tab = tBrowser.selectedTab;
		//var browser = tBrowser.getBrowserForTab(tab);
		//var doc = browser.contentDocument;
		//doc.test('w00t');

/*
(04:31:40 PM) [DA]Xel_: var tBrowser = top.document.getElementById("content");
(04:31:40 PM) [DA]Xel_: var tab = tBrowser.selectedTab;
(04:31:40 PM) [DA]Xel_: var browser = tBrowser.getBrowserForTab(tab);
(04:31:40 PM) [DA]Xel_: var doc = browser.contentDocument;
(04:31:46 PM) [DA]Xel_: doc.functionFoo();
(04:31:54 PM) remitaylor: sweeeeeeet.
(04:31:58 PM) [DA]Xel_: where functionFoo() is what you are calling
*/
	  } 
	}); 

	function FirebugUJSPanel() {} 

	FirebugUJSPanel.prototype = extend(Firebug.Panel, { 
	  name: "FirebugUJS", 
	  title: "UJS", 
	  parentPanel: "html",

	show: function(state) {
		//FirebugContext.getPanel("FirebugUJS").printLine('called show');
		// FirebugContext.getPanel("FirebugUJS").printLine('jQuery = ' + jQuery);
		//FirebugContext.getPanel("FirebugUJS").printLine('trying to get window ...');

		//gBrowser.selectedBrowser.contentWindow

		//with( gBrowser.selectedBrowser.contentWindow ){ alert('hi'); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('cache?'); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(jQuery.cache[1]); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(jQuery.data); }

		//var tBrowser = top.document.getElementById("content");
		//var tab = tBrowser.selectedTab;
		//var browser = tBrowser.getBrowserForTab(tab);
		//var doc = browser.contentDocument;
		//doc.test('w00t');

		//var msg = 'i am the message from the extension';
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(msg); }

		//with( gBrowser.selectedBrowser.contentWindow ){ alert('1'); }
		//var tBrowser = top.document.getElementById("content");
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('2'); }
		//var tab = tBrowser.selectedTab;
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('3'); }
		//var browser = tBrowser.getBrowserForTab(tab);
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('4'); }
		//var doc = browser.contentDocument;
		//var x = doc.getElementsByClassName('tweet')[0];
		//with( gBrowser.selectedBrowser.contentWindow ){ alert( jQuery.data(x, 'events') ); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('5'); }
		//var header = doc.getElementById('header');
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('got header?'); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(header); }
		//var text = doc.getElementById('contribute_to_open_source').innerHTML;
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(text); }
		//doc.test('w00t');
		
		//var hh = doc.getElementById('header');
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('header: ' + hh); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('bindings? ' + FirebugUJS.jQuery.bindings); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(5); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(document.getElementById('header')); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert(alert(typeof($))); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert($('a.tweet')); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert('last'); }

		//with( top.document.getElementById("content").contentWindow ) {
			//alert('hello from extension' + $.data( $('a.tweet')[0], 'events' ) );
		//}
		//FirebugContext.getPanel("FirebugUJS").printLine('AFTER');
	},   

	supportsObject: function(object) {    
		FirebugContext.getPanel("FirebugUJS").printLine('called supportsObject');
		return object instanceof Element ? 1 : 0; 
	},   

	updateSelection: function(element) {
		 clearNode(this.panelNode);

		var ujs = element.getAttribute('ujs');

		// include jquery.js here and use its string & array helpers to make this cleaner
		// and better looking, etc
		//
		// it's just HTML, so add some purty styles, etc (like the CSS style window)
                
		if (ujs == null) {
		  FirebugContext.getPanel("FirebugUJS").printLine('No UJS Events');
		} else {
		  var ujs_events = ujs.split('|');
		  for each (var ujs_event in ujs_events) {
		    var type = ujs_event.split(':')[0];
		    var proc = ujs_event.split(':')[1];
		    FirebugContext.getPanel("FirebugUJS").printLine( type + ': ' + proc );
		  }
		}
	},

	  searchable: false, 
	  editable: false,
	  printLine: function(message) {
	    var elt = this.document.createElement("p");
	    elt.innerHTML = message;
	    this.panelNode.appendChild(elt);
	  }
	}); 

	Firebug.registerModule(Firebug.FirebugUJS); 
	Firebug.registerPanel(FirebugUJSPanel); 

}});

// custom event

var myExtension = {
  myListener: function(evt) {
    //alert("Received from web page: " +
    //      evt.target.getAttribute("attribute1") + "/" + 
    //      evt.target.getAttribute("attribute2"));
  }
}

document.addEventListener("MyExtensionEvent", function(e) { myExtension.myListener(e); }, false, true);
