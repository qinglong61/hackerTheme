var action = function () {
    chrome.tabs.executeScript({
        code: '(function(){\
            var b=document.getElementsByTagName("*");\
            for(var i=0;i<b.length;i++){\
                b[i].style.backgroundColor="#000000";\
                b[i].style.color="#60ff20";\
            }\
        })()'
    });
};

var enabled = false;
chrome.storage.local.get("enabled", function (items) {
    if (items.length > 0) {
        console.log(1);
        enabled = items[0].enabled;
    } else {
        console.log(2);
        chrome.storage.local.set({'enabled': enabled});
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    // action();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && enabled) {
        action();
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
                        '原来的值为“%s”，新的值为“%s”。',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
    }
});
