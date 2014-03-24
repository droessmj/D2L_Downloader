function getHTML(){
    return document.body.outerHTML
}
var homeHTML = getHTML();             //Gives you the whole HTML of the page

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "getHTML"){
            sendResponse({html: document.getElementsByTagName("html")[0].innerHTML});
        }
    }
);
