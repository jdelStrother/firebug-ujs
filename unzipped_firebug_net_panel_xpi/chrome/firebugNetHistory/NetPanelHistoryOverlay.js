/* ***** BEGIN LICENSE BLOCK *****
 * 
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is Firebug Net Panel History Overlay.
 * 
 * The Initial Developer of the Original Code is Mihailo Lalevic.
 * Portions created by Initial Developer are Copyright (C) 2008 the
 * Initial Developer. All Rights Reserved.
 * 
 * Contributor(s): 
 * 
 * ***** END LICENSE BLOCK ***** */

//gets panel prototype from the panel type list
function getPanelPrototype(aName) {
    for (var i = 0; i < Firebug.panelTypes.length; i++) {
        if (aName == Firebug.panelTypes[i].prototype.name) {
            return Firebug.panelTypes[i].prototype;
        }
    }
    return null;
}

FBL.ns(function () { with (FBL) { 
  
const Cc = Components.classes;
const Ci = Components.interfaces; 

const nsIPrefBranch2 = Ci.nsIPrefBranch2; //("nsIPrefBranch2");
const PrefService = Cc["@mozilla.org/preferences-service;1"];

const prefs = PrefService.getService(nsIPrefBranch2);

// Module Implementation
//-----------------------------------------------------------------------------

function fakeNetProgress(netProgress){
  this.requests = netProgress.requests;
  this.requestMap = netProgress.requestMap;
  this.files = netProgress.files;
  this.phases = netProgress.phases;
  this.documents = netProgress.documents;
  this.windows = netProgress.windows;
  this.pending = []; //dummy so layout will pass
  
  this.copyToObject = function(item){
    item.requests = this.requests;
    item.requestMap = this.requestMap;
    item.files = this.files;
    item.phases = this.phases;
    item.documents = this.documents;
    item.windows = this.windows;
  }
  
  this.updatePanel = function(panel){
    panel.clear();
    for (var i = 0; i < this.files.length; ++i)
    {
      //remove row association so row will be shown
        this.files[i].row = null;
        panel.updateFile(this.files[i]);
    }
    panel.layout();
  }

  this.activate = function(panel){
    if(panel){
      this.updatePanel(panel);
    }
  }
  
  this.clear = function(){
    //we don't want to clear
  }
}

Firebug.NetPanelHistoryOverlayModel = extend(Firebug.Module, 
{ 
    historyData: [], //keeps the history data

    historyIndex: -1, //history index, used to tell which history data to show

    historySaved: false, //current data is pushed to history data only at 
                         //certain points: destroy context or navigating
                         //history. this parameter tells if the history
                         //has been saved for the current context
    
    originalNetMonitor: null, //preserve original netMonitor which has
                              //all of the observers active and keeps
                              //track of all of the currently active file
                              //downloads. just before context destroy the
                              //original netMonitor is restored and passed
                               //back to the context so proper finalization is
                              //done. This is due to the implementation 
                              //of this netHistory module which is to swap data
                              //in the contex.netMonitor and flush the data to
                              //be displayed on the net panel. A bit hacky,
                              //investigating better alternative
    
    //pushes data to history array
    pushHistory: function (netProgress, destroying) {
    	//if not enabled skip
        if (!this.getEnabledPreference()) {
            return;
        }
        
        //set flag that history is saved
        this.historySaved = true;
        
        //keep original net monitor since it is still attached to browser 
        //events, will restore it on destroy context
        if(!destroying) {
          this.hijackNetProgress(netProgress); //TODO: (ML) think about better name
        }
        
        //copy data into history item and push it to history array
        var historyItem = new fakeNetProgress(netProgress);
        this.historyData.push(historyItem);
        
        //if history is over history depth remove first item in the list
        if (this.historyData.length > this.getHistoryDepthPreference()) {
            this.historyData.shift();
        }
    },
    
    hijackNetProgress : function(netProgress){
      this.originalNetMonitor = netProgress;
      netProgress.activate(null); //so it will not update panel
    },
    
    //reads enabled preference - default false
    getEnabledPreference: function () {
        if (prefs) {
            return prefs.getBoolPref(this.getPreferenceName('enabled'));
        }
        return false;
    },
    
    //sets enabled preference
    setEnabledPreference: function (newvalue) {
        return prefs.setBoolPref(this.getPreferenceName('enabled'), newvalue);
    },
    
    //gets history depth preference - default is 10
    getHistoryDepthPreference: function () {
        if (prefs) {
            return prefs.getIntPref(this.getPreferenceName('historyDepth'));
        }
        return 10;
    },
    
    //sets history depth preference
    setHistoryDepthPreference: function (newvalue) {
        return prefs.setIntPref(this.getPreferenceName('historyDepth'), newvalue);
    },
    
    //helper function to get full preference name
    getPreferenceName: function (name) {
        return this.prefDomain + '.' + name;
    },
    
    //loads history for given history index
    loadHistory: function (index, context){ //, netProgress) {
    	//if not enabled skip loading history
        if (!this.getEnabledPreference()) {
            return;
        }

        //check if history data exists for given index
        if (this.historyData.length > index) {
            var historyItem = this.historyData[index];
            //update history progress data and refresh network panel 
            if (historyItem) {
                //historyItem.copyToObject(netProgress); //we gonna swap netProgress
                context.netProgress = historyItem; //we are setting fake netProgress while 
                                                  //we gonna keep the original one and before
                                                  //destroy we gonna return it back

                var panel = context.getPanel("net", true);
                if (panel)
                {
                    historyItem.updatePanel(panel);
                    this.setHistoryText();
                }
            }
        }
    },
    
    //go to previous history item
    //sets the right history index and loads history item
    prevHistory: function (context) {
        if (this.historyIndex < 0) {
            this.historyIndex = this.historyData.length;
        }
        
        if (!this.historySaved) {
            this.pushHistory(context.netProgress, false);
        }

        if (this.historyIndex > 0) {
            this.historyIndex --;
            this.loadHistory(this.historyIndex, context); //, context.netProgress);
        }
    },
    
    //go to next history item
    //sets the right history index and loads history item
    nextHistory: function (context) {
        if (this.historyIndex < 0) {
            this.historyIndex = this.historyData.length;
        }
        
        if (!this.historySaved) {
            this.pushHistory(context.netProgress, false);
        }

        if (this.historyIndex >= 0 && this.historyIndex + 1 < this.historyData.length) {
            this.historyIndex ++;
            this.loadHistory(this.historyIndex, context); //, context.netProgress);
        }
    },
    
    //prefix for reading configuration data
    prefDomain: "extensions.firebug.netHistory",
    
    //two methods that keep original functions from the net panel and
    //net monitor which will be overriden in initialize function
    //originalNetMonitorDestroyContextFunction : null,
    originalPanelGetMenuFunction : null,
    
    //initialize is called at the beginning of objects life cycle
    //adds observer to monitor preference changes and overrides
    //methods from original net panel and net monitor
    initialize: function () {
      
        prefs.addObserver(this.prefDomain, this, false);
        
        this.fixNetMonitor();
        /*
        //change net monitor destroy function to record context before it leaves
        if (Firebug.NetMonitor) {
        	//XXXmihailo: check if I should do bind here
            this.originalNetMonitorDestroyContextFunction = Firebug.NetMonitor.destroyContext;
            Firebug.NetMonitor.destroyContext = bind(this.overrideDestroyContext, this); 
        }*/
            
        //there is no panel at this point in execution so we have to
        //get its prototype through the list of registered panels
        var panel = getPanelPrototype("net");
        
        this.originalPanelGetMenuFunction = panel.getOptionsMenuItems;

        panel.getOptionsMenuItems = bindFixed(this.overrideGetOptionsMenu, this); 
    },
    
    fixNetMonitor : function(){
      
      //this.originalNetMonitorDestroyContextFunction = bind(Firebug.NetMonitor.onPanelDeactivate, Firebug.NetMonitor);
      Firebug.NetMonitor.onPanelDeactivate = bind(this.overrideDestroyContext, this); 
    },
    //*** changed in firebug implementation so changed here
    //pushes history if unmonitoring, and returns originalNetMonitor
    //so it will be unmonitored correctly
    //TODO: (ML) think about removing the last history line and swap
    //it with the current context since it might be changed by finishing
    //download of some of the files that were not originally downloaded
    //when history was loaded
    overrideDestroyContext: function (context, destroy) {
        if (this && !this.historySaved) {
                this.pushHistory(context.netProgress, true);
        }
        
        if (this.originalNetMonitor) {
            context.netProgress = this.originalNetMonitor; //unmonitor original monitor
        }
        
        function unmonitorContext(context)
	    {
	        var netProgress = context.netProgress;
	        if (netProgress)
	        {
	            if (netProgress.pendingInterval)
	            {
	                context.clearInterval(netProgress.pendingInterval);
	                delete netProgress.pendingInterval;
	    
	                netProgress.pending.splice(0, netProgress.pending.length);
	            }
	    
	            if (context.browser.docShell)
	                context.browser.removeProgressListener(netProgress, NOTIFY_ALL);
	    
	            delete context.netProgress;
	        }
	    }
      
        unmonitorContext(context);


        //call original function
        //XXXmihailo: check if I need to use invoke here
        //this.originalNetMonitorDestroyContextFunction(context, destroy);
    },
    
    //overrides original function in netPanel - getOptionsMenuItems
    //in the initialize function we are keeping the original function
    //so now we can get all the items that netPanel generates and
    //just push our two items to the array and return it back to
    //firebug to show them
    overrideGetOptionsMenu: function () {
    	var result = this.originalPanelGetMenuFunction();

        var value = this.getEnabledPreference();
        //using bindFixed from Firebug
        //first item is definition of Enable history menu item in options menu
        //second item is definition of Set history depth menu item in options menu
        result.push(
            { label: "Enable history", nol10n: true, type: "checkbox", checked: value, command: bindFixed(this.setEnabledPreference, this, !value) },
            { label: "Clear history", nol10n: true, type: "text", checked: value, command: bindFixed(this.clearHistory, this, FirebugContext) },
            { label: "Set history depth", nol10n: true, type: "text", checked: false, command: bindFixed(this.showOptionsDialog, this) }
        );

        return result;
    },
    
    //shows the options dialog for setting history depth parameter
    //sets up input/output parameters from the dialog (see examples
    //on developer.mozilla.org), opens dialog and if result is set
    //applies it to the preference value
    showOptionsDialog: function () {
        var params = {
            inParam: this.getHistoryDepthPreference(), 
            out: null
        };
        window.openDialog('chrome://firebugnethistory/content/netHistoryParameters.xul',
                          '_blank',
                          'chrome,centerscreen,modal',
                          params);
        if (params.out) {
            this.setHistoryDepthPreference(params.out);
        }
    },

    //remove preferences change observer on the end of lifecycle
    shutdown: function () {
        prefs.removeObserver(this.prefDomain, this, false);
    },

    //on each context initialization initialize the history overlay too
    initContext: function (context) {
        this.historySaved = false;
        this.historyIndex = this.historyData.length; //new context so new index is the length
        this.setHistoryText();
        this.originalNetMonitor = null;
    },

    //sets history text on top of the net history overlay buttons
    setHistoryText : function () {
        if (!this.getEnabledPreference()) {
            $("fbNetFilter-historyLabel").value = 'History disabled';
            return;
        }
        
        var totalCount = this.historyData.length;
        var historyCount = this.historyIndex + 1;
        if (!this.historySaved) {
            if (totalCount < this.getHistoryDepthPreference()) {
                totalCount ++;
            }
            if (historyCount > totalCount) {
              historyCount = totalCount;
            }
        }
        $("fbNetFilter-historyLabel").value = 'History: ' + historyCount + '/' + totalCount;
    },
    
    //called on preferences change
    syncButtons: function (chrome) {
        //update buttons and trim history if required
        var historyDepth = this.getHistoryDepthPreference();
        //trim array
        if (historyDepth && this.historyData) {
            var trimSize = this.historyData.length - historyDepth;
            if (trimSize > 0) {
                this.historyData.splice(0, trimSize);
                if (this.historyIndex < trimSize - 1) {
                    this.historyIndex = historyDepth - 1;
                    this.loadHistory(this.historyIndex, FirebugContext); //, FirebugContext.netProgress);
                }
                else {
                    this.historyIndex = (this.historyIndex - trimSize) + 1; 
                }
            }
        }
        
        this.setHistoryText();
    },
    
    clearHistory: function(context)
    {
      if(!this.historySaved){
        this.historyData = [];
      }else{
        this.historyData.splice(0, this.historyData.length - 1);        
      }
      this.historyIndex = 0;
      this.loadHistory(this.historyIndex, context); //, context.netProgress);
      this.syncButtons();
    },
    // nsIPrefObserver - observes changes to parameters of the history
    // overlay
    observe: function (subject, topic, data) 
    {
        // We're observing preferences only.
        if (topic != "nsPref:changed") {
            return;
        }

        var prefName = data.substr(this.prefDomain.length + 1);
        switch (prefName)
        {
            case "enabled":
            case "historyDepth":
                this.syncButtons(FirebugChrome);
            break;
        }
    }
}); 

Firebug.registerModule(Firebug.NetPanelHistoryOverlayModel);

}});

//----------------------------------------------------------------------------- 