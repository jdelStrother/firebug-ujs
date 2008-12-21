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

//loading initial values to dialog elements from input parameters
function onLoad(){
    document.getElementById("historyDepthValue").value = window.arguments[0].inParam;
}

//checkes if entered value is number and if it is sets the value to
//the output parameter
function onAccept(){
    var depth = parseInt(document.getElementById('historyDepthValue').value);
    if (!isNaN(depth) && depth > 0) {
        window.arguments[0].out = depth;
        return true;
    }
    else{
        alert('Not a valid number!');
        return false;
    }
}