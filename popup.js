var homeURL = 'https://uwec.courses.wisconsin.edu/d2l/home';

var d2lfetch = {

  fetch: function() {
    chrome.tabs.query({currentWindow:true,active:true}, function(tab) 
      { 
        if(tab[0].url != homeURL){
          chrome.tabs.create({url: homeURL});
          alert("Redirected to your D2L homepage");
        }
      });

    //gather all active class
  }

};


// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  d2lfetch.fetch();
});
