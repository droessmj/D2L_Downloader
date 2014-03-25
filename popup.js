var homeURL = 'https://uwec.courses.wisconsin.edu/d2l/home';
var baseURL = 'https://uwec.courses.wisconsin.edu/';

var d2lfetch = {

  fetch: function() {

    chrome.tabs.query({currentWindow:true,active:true}, function(tab) 
    { 
      if(tab[0].url != homeURL){
        chrome.tabs.create({url: homeURL});
        alert("Redirected to your D2L homepage");
      }
    });

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {method: "getHTML"}, function(response) {
            var allHTML = '';
            if(response.method=="getHTML"){
                allHTML = response.data;
            }
            
            var element = document.createElement( 'div' );
            element.innerHTML = allHTML;

            var links = [];

            $(element).find('.d2l-placeholder').find('a').each(function() {
              //alert();
              var content = $(this).attr('href');
              if( content != "javascript:void(0);" && content.indexOf("ou=") != -1 ){
                links.push($(this).attr('href'));
              }
            });

            //foreach class link
            $.each(links, function(key, value){
              chrome.tabs.create({url: baseURL+value});
            });
        });
    });

    //a tab should be open for each active classes
    //for each tab, navigate to content -> download

  }



};


// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  d2lfetch.fetch();
});


//class="d2l-placeholder d2l-placeholder-live"