chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Turning ' + tab.url + ' hackerTheme!');
  chrome.tabs.executeScript({
    code: '(function(){\
      var b=document.getElementsByTagName("*");\
      for(var i=0;i<b.length;i++){\
        b [i].style.backgroundColor="#000000";\
        b[i].style.color="#60ff20";\
      }\
    })()'
  });
});
