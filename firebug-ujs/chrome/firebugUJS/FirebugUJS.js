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
	    //var elt = this.document.createElement("p");
	    //elt.innerHTML = message;
	    //this.panelNode.appendChild(elt);

		clearNode(this.panelNode);

		var tBrowser = top.document.getElementById("content");
		var tab = tBrowser.selectedTab;
		var browser = tBrowser.getBrowserForTab(tab);
		var doc = browser.contentDocument;
		var head = doc.getElementsByTagName('head')[0];
		var body = doc.getElementsByTagName('body')[0];

		//FirebugContext.getPanel("FirebugUJS").printLine( 'head: ' );
		//FirebugContext.getPanel("FirebugUJS").printLine( head );
		// FirebugContext.getPanel("FirebugUJS").printLine( head.innerHTML );
		//FirebugContext.getPanel("FirebugUJS").printLine( doc.getElementById('section_10').innerHTML );

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

		FirebugContext.getPanel("FirebugUJS").printLine('dir: ');
		// testing to try to get extension dir ...
		//var componentFile = __LOCATION__;
		//var componentsDir = componentFile.parent;
		//var extensionDir = componentsDir.parent;
		
		//var dir = Components.classes["@mozilla.org/file/directory_service;1"].
		//	getService(Components.interfaces.nsIProperties).
		//	get("resource:app", Components.interfaces.nsIFile);

		// the extension's id from install.rdf
		//var MY_ID = "myextension@my.name";
		var MY_ID = "{8E812B7E-0FF3-11DD-9194-8F9555D89593}";
		var em = Components.classes["@mozilla.org/extensions/manager;1"].
			getService(Components.interfaces.nsIExtensionManager);
		// the path may use forward slash ("/") as the delimiter
		// returns nsIFile for the extension's install.rdf
		var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, "install.rdf");
		var dir = file.path;

		// FirebugContext.getPanel("FirebugUJS").printLine( dir );

		var src = dir; // => /home/remi/.mozilla/firefox/efs72yik.default/extensions/{8E812B7E-0FF3-11DD-9194-8F9555D89593}/install.rdf
		src = 'file://' + src;
		src = src.replace('install.rdf', 'chrome/firebugUJS/FirebugUJS.client-side.js');

/*
		var file = Components.classes["@mozilla.org/file/local;1"].
			                     createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath( src );

   		var file = URL.QueryInterface(Components.interfaces.nsIFileURL).file;

		// |file| is nsIFile
		var data = "";
		var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
					createInstance(Components.interfaces.nsIFileInputStream);
		var sstream = Components.classes["@mozilla.org/scriptableinputstream;1"].
					createInstance(Components.interfaces.nsIScriptableInputStream);
		fstream.init(file, -1, 0, 0);
		sstream.init(fstream); 

		var str = sstream.read(4096);
		while (str.length > 0) {
		  data += str;
		  str = sstream.read(4096);
		}

		sstream.close();
		fstream.close();
		// alert(data);
		FirebugContext.getPanel("FirebugUJS").printLine( data );
*/
		FirebugContext.getPanel("FirebugUJS").printLine( 'get contents ... of: ' + src );
		// FirebugContext.getPanel("FirebugUJS").printLine( getContents(src) );
		FirebugContext.getPanel("FirebugUJS").printLine( this.getContents('chrome://firebugujs/content/hello.txt') );
		FirebugContext.getPanel("FirebugUJS").printLine( this.getContents('chrome://firebugujs/content/FirebugUJS.client-side.js') );

		// won't work!  can't loca JS off local filesystem.  sheesh.  gotta read the file into a <script> tag!
		test_script = doc.createElement('script');
		test_script.setAttribute('type', 'text/javascript');
		test_script.innerHTML =  'alert("requiring ...");';
		//test_script.innerHTML +=  'alert("<script type=\'text/javascript\' src=\'' + src + '\'></script>");';
		//test_script.innerHTML +=  'document.write("<script type=\'text/javascript\' src=\'' + src + '\'></script>");';
		test_script.innerHTML += this.getContents('chrome://firebugujs/content/FirebugUJS.client-side.js');
		test_script.innerHTML += 'alert("required!");';
		body.appendChild(test_script);

		var my_script = doc.getElementById('firebug-js-include');
		if (my_script == null) {
			my_script = doc.createElement('script');
			my_script.setAttribute('id', 'firebug-js-include');
			my_script.setAttribute('type', 'text/javascript');
			my_script.setAttribute('src', src);
			// body.appendChild(my_script);

			// head.appendChild(my_script);
			    // this.panelNode.appendChild(my_script);
		}


	},

	  searchable: false, 
	  editable: false,
	  printLine: function(message) {
	    var elt = this.document.createElement("p");
	    elt.innerHTML = message;
	    this.panelNode.appendChild(elt);
	  },

    getContents: function(aURL) {
FirebugContext.getPanel("FirebugUJS").printLine('1');
      var ioService=Components.classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);
FirebugContext.getPanel("FirebugUJS").printLine('2');
      var scriptableStream=Components
        .classes["@mozilla.org/scriptableinputstream;1"]
        .getService(Components.interfaces.nsIScriptableInputStream);
FirebugContext.getPanel("FirebugUJS").printLine('3');

      var channel=ioService.newChannel(aURL,null,null);
FirebugContext.getPanel("FirebugUJS").printLine('4');
      var input=channel.open();
FirebugContext.getPanel("FirebugUJS").printLine('5');
      scriptableStream.init(input);
FirebugContext.getPanel("FirebugUJS").printLine('6');
      var str=scriptableStream.read(input.available());
FirebugContext.getPanel("FirebugUJS").printLine('7');
      scriptableStream.close();
FirebugContext.getPanel("FirebugUJS").printLine('8');
      input.close();
FirebugContext.getPanel("FirebugUJS").printLine('9');
      return str;
    }

    //try{
    //  alert(getContents("chrome://browser/content/browser.css"));
    //  alert(getContents("http://www.mozillazine.org/"));
    //}catch(e){alert(e)}

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
