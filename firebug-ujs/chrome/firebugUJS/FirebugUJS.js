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

		var ujs = element.getAttribute('ujs');
                
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

		/*
		FirebugContext.getPanel("FirebugUJS").printLine('called updateSelection, element: ' + element);

		var tBrowser = top.document.getElementById("content");
		FirebugContext.getPanel("FirebugUJS").printLine('tBrowser: ' + tBrowser);

		var tab = tBrowser.selectedTab;
		FirebugContext.getPanel("FirebugUJS").printLine('tab: ' + tab);

		var browser = tBrowser.getBrowserForTab(tab);
		FirebugContext.getPanel("FirebugUJS").printLine('browser: ' + browser);

		var doc = browser.contentDocument;
		FirebugContext.getPanel("FirebugUJS").printLine('document: ' + doc);

		var win = browser.contentWindow;
		FirebugContext.getPanel("FirebugUJS").printLine('window: ' + win);

	        with( gBrowser.selectedBrowser.contentWindow ){ alert('trying to get a_global_variable'); }
	        with( gBrowser.selectedBrowser.contentWindow ){ alert('a_global_variable: ' + a_global_variable); }

		var a_global_var = win['a_global_variable'];
		FirebugContext.getPanel("FirebugUJS").printLine('a_global_variable: ' + a_global_var);
		*/
		
	//with( gBrowser.selectedBrowser.contentWindow ){ alert('selected element: ' + element); }
		// with( gBrowser.selectedBrowser.contentWindow ){ alert( typeof($) ); }
	//with( gBrowser.selectedBrowser.contentWindow ){ alert( typeof(test) ); }
		// with( gBrowser.selectedBrowser.contentWindow ){ alert( typeof($['cache']) ); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert( jQuery.data( element ) ); }
		//with( gBrowser.selectedBrowser.contentWindow ){ test('foo'); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert( jQuery.cache ); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert( jQuery.cache[2] ); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert( jQuery.cache[2]['events'] ); }
		//with( gBrowser.selectedBrowser.contentWindow ){ alert( jQuery.cache[ jQuery.data(element) ]['events'] ); }

		// FirebugContext.getPanel("FirebugUJS").printLine( 'jquery: ' + $(element).text() );
		//FirebugContext.getPanel("FirebugUJS").printLine('called updateSelection' + element + ' ... innerHTML => ' + element.innerHTML + ' ... before');
		// FirebugContext.getPanel("FirebugUJS").printLine( jQuery(element).value() ); // <--- is jQuery available in this context?
		// ^ blows up
		//FirebugContext.getPanel("FirebugUJS").printLine('after);
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
