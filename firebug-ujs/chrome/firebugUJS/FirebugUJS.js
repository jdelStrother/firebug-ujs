FBL.ns(function() { with (FBL) { 
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
    FirebugContext.getPanel("FirebugUJS").printLine('Clicked Button 1'); 
  }, 
  button2: function() { 
    FirebugContext.getPanel("FirebugUJS").printLine('Clicked Button 2'); 
  } 
}); 
function FirebugUJSPanel() {} 
FirebugUJSPanel.prototype = extend(Firebug.Panel, { 
  name: "FirebugUJS", 
  title: "Test Panel", 
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
