const text0 = "开启黑客模式";
const text1 = "关闭黑客模式";
var enabled = false;

function click (event) {
    console.log(enabled?"1":"2");
    enabled = !enabled;
    var btn = document.getElementById("btn");
    btn.innerHTML = enabled?text1:text0;
    chrome.storage.local.set({'enabled': enabled});
}

function mouseout (event)
    window.close();
}

document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("enabled", function (items) {
        if (items.length > 0) {
            console.log("11");
            enabled = items[0].enabled;
        } else {
            console.log("22");
            chrome.storage.local.set({'enabled': enabled});
        }
    });
    var btn = document.getElementById("btn");
    btn.innerHTML = enabled?text1:text0;
    btn.addEventListener("click", click);
    document.addEventListener("mouseout", mouseout);
});
