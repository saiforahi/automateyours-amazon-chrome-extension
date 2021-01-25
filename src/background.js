browser.runtime.onMessage.addListener(function () {
  console.log('Hello from the background')
  // browser.tabs.executeScript({
  //   file: 'amazon-auto-order-script.js',
  // });
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message==="get_order_details"){
      chrome.storage.local.get(['order','card','lines','cart'],function(result){
        sendResponse({'lines':result.lines,'order':result.order,'card':result.card,'cart':result.cart})
      })
    }
    if(request.message==="clear_logout"){
      //chrome.storage.local.clear();
    }
    if( request.message === "valid" ) {
      console.log('valid icon')
        chrome.browserAction.setIcon({
            path:"icons/on_icon16.png",
            tabId: sender.tab.id
        });
    }

    if( request.message === "invalid" ) {
      console.log('invalid icon')
        chrome.browserAction.setIcon({
            path:"icons/off_icon16.png",
            tabId: sender.tab.id
        });
    }
  }
);
//npm config set ignore-scripts false
