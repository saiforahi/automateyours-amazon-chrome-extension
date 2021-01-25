window.history.go()
console.log('hello from content-script')
// chrome.storage.local.get('order_url',function(result){
//     window.history.go(result.order_url)
// });
window.close()