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
    if(request.message==="api_token"){
      chrome.storage.local.get(['api_token'],function(result){
        if(result.api_token!==undefined){
          sendResponse({api_token:result.api_token})
        }
      })
    }
    if(request.message==="clear_logout"){
      console.log('clearing storage....')
      chrome.storage.local.clear();
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

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    
    if (changeInfo.url==="https://www.amazon.com/gp/buy/addressselect/handlers/display.html?hasWorkingJavascript=1") {
      chrome.tabs.reload(tabId)
      console.log(changeInfo)
      // chrome.tabs.executeScript({ code: "let element=document.getElementById('add-new-address-popover-link');element.click()" });
      // chrome.tabs.sendMessage( tabId, {
      //   message: 'hello!',
      //   url: changeInfo.url
      // })
      chrome.tabs.executeScript({
        file: 'js/amazon-address-fill-up.js',
      });
    }
  }
);
//npm config set ignore-scripts false
