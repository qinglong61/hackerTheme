const text0 = "开启黑客模式";
const text1 = "关闭黑客模式";
var enabled = false;

function isEmpty (obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};

function click (event) {
    enabled = !enabled;
    var btn = document.getElementById("btn");
    btn.innerHTML = enabled?text1:text0;
    chrome.storage.local.set({'enabled': enabled});
}

function mouseout (event) {
    window.close();
}

document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", click);
    btn.addEventListener("mouseout", mouseout);

    chrome.storage.local.get('enabled', function (item) {
        if (!isEmpty(item)) {
            enabled = item.enabled;
        } else {
            chrome.storage.local.set({'enabled': enabled});
        }
        btn.innerHTML = enabled?text1:text0;
    });
});
