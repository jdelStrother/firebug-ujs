FBL.ns( function() { with (FBL) { 

	// MODULE
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
		button1: function() { }, 
		button2: function() { } 
	}); 

	// PANEL
	function FirebugUJSPanel() {} 

	FirebugUJSPanel.prototype = extend(Firebug.Panel, { 

		name: "FirebugUJS", 
		title: "UJS", 
		parentPanel: "html",

		show: function(state) { },   

		supportsObject: function(object) {    
			FirebugContext.getPanel("FirebugUJS").printLine('called supportsObject');
			return object instanceof Element ? 1 : 0; 
		},   

		updateSelection: function(element) {
			 clearNode(this.panelNode);
			 // this is too late!  window.onload is already run by now ... meaning we can't override things  :(
			 //
			 // need to add this javascript before the page gets loaded!  when the plugin is initialized?
			 this.load_client_side_javascript();

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
		load_client_side_javascript: function() {
			 var tBrowser = top.document.getElementById("content");
			 var tab = tBrowser.selectedTab;
			 var browser = tBrowser.getBrowserForTab(tab);
			 var doc = browser.contentDocument;
			 var head = doc.getElementsByTagName('head')[0];
			 var body = doc.getElementsByTagName('body')[0];

			 var MY_ID = "{8E812B7E-0FF3-11DD-9194-8F9555D89593}";
			 var em = Components.classes["@mozilla.org/extensions/manager;1"].
				 getService(Components.interfaces.nsIExtensionManager);
			 var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, "install.rdf");
			 var dir = file.path;
			 var src = dir; // => /home/remi/.mozilla/firefox/.../extensions/{...}/install.rdf
			 src = 'file://' + src;
			 src = src.replace('install.rdf', 'chrome/firebugUJS/FirebugUJS.client-side.js');
			 test_script = doc.createElement('script');
			 test_script.setAttribute('type', 'text/javascript');
			 //test_script.innerHTML =  'alert("requiring ...");';
			 test_script.innerHTML += this.getContents('chrome://firebugujs/content/FirebugUJS.client-side.js');
			 //test_script.innerHTML += 'alert("required!");';
			 body.appendChild(test_script);
		},
	    	printLine: function(message) {
		    var elt = this.document.createElement("p");
		    elt.innerHTML = message;
		    this.panelNode.appendChild(elt);
	    	},

		getContents: function(aURL) {
		     var ioService=Components.classes["@mozilla.org/network/io-service;1"]
			     .getService(Components.interfaces.nsIIOService);
		     var scriptableStream=Components
			     .classes["@mozilla.org/scriptableinputstream;1"]
			     .getService(Components.interfaces.nsIScriptableInputStream);

		     var channel=ioService.newChannel(aURL,null,null);
		     var input=channel.open();
		     scriptableStream.init(input);
		     var str=scriptableStream.read(input.available());
		     scriptableStream.close();
		     input.close();
		     return str;
	    	}	


	}); 

	Firebug.registerModule(Firebug.FirebugUJS); 
	Firebug.registerPanel(FirebugUJSPanel); 

// trying to do something onload ... need to hook this up to my extension, not "myExtension" ...
window.addEventListener("load", function() { myExtension.init(); }, false);

var myExtension = {

  init: function() {
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent)
      appcontent.addEventListener("DOMContentLoaded", myExtension.onPageLoad, true);
    var messagepane = document.getElementById("messagepane"); // mail
    if(messagepane)
      messagepane.addEventListener("load", function () { myExtension.onPageLoad(); }, true);
  },

  onPageLoad: function(aEvent) {
    var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
    // do something with the loaded page.
    // doc.location is a Location object (see below for a link).
    // You can use it to make your code executed on certain pages only.
    //if(doc.location.href.search("localhost") > -1)
      //alert("you're on localhost!");
      //

    //alert( doc );
    //alert( doc.getElementsByTagName('head') );
    alert( doc.getElementsByTagName('title')[0].innerHTML );
    //doc.getElementsByTagName('title')[0].innerHTML = 'changed!';
    //alert( doc.getElementsByTagName('title')[0].innerHTML );

			 var tBrowser = top.document.getElementById("content");
			 var tab = tBrowser.selectedTab;
			 var browser = tBrowser.getBrowserForTab(tab);
			 var doc2 = browser.contentDocument;

			 //alert( doc2.getElementsByTagName('title')[0].innerHTML );
			 //doc2.getElementsByTagName('title')[0].innerHTML = 'changed!';
			 //alert( doc2.getElementsByTagName('title')[0].innerHTML );

			 //alert( doc2.getElementsByTagName('h1')[0].innerHTML );
			 doc2.getElementsByTagName('h1')[0].innerHTML = 'changed!';
			 //alert( doc2.getElementsByTagName('h1')[0].innerHTML );

			 var head = doc2.getElementsByTagName('head')[0];
			 //var body = doc.getElementsByTagName('body')[0];

			 // alert('head => ' + head.innerHTML);
			 //var client_side_js = this.getContents('chrome://firebugujs/content/FirebugUJS.client-side.js');
  			 //alert( client_side_js );

			 var MY_ID = "{8E812B7E-0FF3-11DD-9194-8F9555D89593}";
			 var em = Components.classes["@mozilla.org/extensions/manager;1"].
				 getService(Components.interfaces.nsIExtensionManager);
			 var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, "install.rdf");
			 var dir = file.path;
			 var src = dir; // => /home/remi/.mozilla/firefox/.../extensions/{...}/install.rdf
			 src = 'file://' + src;
			 src = src.replace('install.rdf', 'chrome/firebugUJS/FirebugUJS.client-side.js');
			 test_script = doc.createElement('script');
			 test_script.setAttribute('type', 'text/javascript');
			 test_script.innerHTML =  'alert("requiring ...");';

			// taken from getContents ... will re-extract to method during refactoring phase ...
			// just wanna get this working!
		     var ioService=Components.classes["@mozilla.org/network/io-service;1"]
			     .getService(Components.interfaces.nsIIOService);
		     var scriptableStream=Components
			     .classes["@mozilla.org/scriptableinputstream;1"]
			     .getService(Components.interfaces.nsIScriptableInputStream);

		     var channel=ioService.newChannel(src,null,null);
		     var input=channel.open();
		     scriptableStream.init(input);
		     var str=scriptableStream.read(input.available());
		     scriptableStream.close();
		     input.close();

		     ///
			 test_script.innerHTML += str;
			 test_script.innerHTML += 'alert("required!");';
			 head.appendChild(test_script);
  },

		getContents: function(aURL) {
		     var ioService=Components.classes["@mozilla.org/network/io-service;1"]
			     .getService(Components.interfaces.nsIIOService);
		     var scriptableStream=Components
			     .classes["@mozilla.org/scriptableinputstream;1"]
			     .getService(Components.interfaces.nsIScriptableInputStream);

		     var channel=ioService.newChannel(aURL,null,null);
		     var input=channel.open();
		     scriptableStream.init(input);
		     var str=scriptableStream.read(input.available());
		     scriptableStream.close();
		     input.close();
		     return str;
	    	}	

}

}});
