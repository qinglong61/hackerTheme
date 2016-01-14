function action (tabId) {
    chrome.tabs.executeScript(
        tabId,
        {
            code: '(function(){\
                        var b=document.getElementsByTagName("*");\
                        for(var i=0;i<b.length;i++){\
                            b[i].style.backgroundColor="#282c34";\
                            b[i].style.color="#60cc20";\
                        }\
                    })()',
            allFrames:true
        }
    );
    chrome.tabs.insertCSS (
        tabId,
        {
            code:  'a:link {color:#60cc20;}\
                    a:visited {color:#60cc20;}\
                    a:hover {color:#60cc20;}\
                    a:active {color:#60cc20;}',
            allFrames:true
        }
    );
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

});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "loading" && enabled) {
        action(tabId);
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        if (key == 'enabled') {
            enabled = storageChange.newValue;
            chrome.tabs.reload();
        }
        // console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
        //                 '原来的值为“%s”，新的值为“%s”。',
        //             key,
        //             namespace,
        //             storageChange.oldValue,
        //             storageChange.newValue);
    }
});
