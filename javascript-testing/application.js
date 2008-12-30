// remi.org

jQuery.fn.update_with_latest_tweet = function(user) {
  var url = 'http://twitter.com/status/user_timeline/' + user + '.json?count=1&callback=?';
  var obj = this;
  jQuery.getJSON(url, function(data) { 
    obj.text(data[0].text);
  });
}

function test(msg) {
	alert('test from extension: ' + msg);
}

jQuery(function(){
  jQuery('a.tweet').update_with_latest_tweet('remitaylor');

  jQuery('a.tweet').click(function(){ console.log('click!'); });
  jQuery('a.tweet').click(function(){ console.log('ANOTHER click!'); });
  jQuery('a.tweet').mouseout(function(){ console.log('mouseout!'); });
  jQuery('a.tweet').mouseover(function(){ console.log('mouseover!'); });
});

// call FF extension

if ("createEvent" in document) {
  console.log('apparently createEvent is in document');
  var element = document.createElement("MyExtensionDataElement");
  element.setAttribute("attribute1", "first attr");
  element.setAttribute("attribute2", "the second");
  document.documentElement.appendChild(element);
  console.log('i set some attributes on a data element that i think my extension can access');

  var evt = document.createEvent("Events");
  evt.initEvent("MyExtensionEvent", true, false);
  console.log('dispatching event');
  element.dispatchEvent(evt);
  console.log('dispatched!');
}
