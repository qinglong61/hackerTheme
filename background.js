function action () {
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

function isEmpty (obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};

// chrome.storage.local.clear();

var enabled = false;
chrome.storage.local.get('enabled', function (item) {
    if (!isEmpty(item)) {
        enabled = item.enabled;
    } else {
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
        if (key == 'enabled') {
            enabled = storageChange.newValue;    
        }
        console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
                        '原来的值为“%s”，新的值为“%s”。',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
    }
});
