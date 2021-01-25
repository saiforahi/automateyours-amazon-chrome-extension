console.log('hello from check-url')
function check_url(site_url){
    const url = new URL(site_url);
    if(url.hostname=="www.amazon.com"){
        chrome.runtime.sendMessage({"message": "valid"});
    }
    else{
        chrome.runtime.sendMessage({"message": "invalid"});
    }
}
window.onfocus=check_url(location.href);