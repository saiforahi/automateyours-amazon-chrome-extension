console.log('Hello from the amazon-auto-order-script')
// function one(){
//     setTimeout(()=>{
//         console.log('func 1')
//         document.querySelector('span.a-dropdown-label').click()
//     },4000)
// }
// function two(){
//     setTimeout(() => {
//         console.log('func 2')
//         let element=document.querySelector('ul.a-nostyle.a-list-link');
//         chrome.storage.local.get(['lines'],function (result){
//             if(result.lines.length>0){
//                 element.children.forEach(child => {
//                     console.log(result.lines[0].qty)
//                     if(child.firstchild.getAttribute('data-value').stringVal===result.lines[0].qty){
//                         child.click();
//                     }
//                 });
//             }
//         })
//     }, 8000);
// }
// function three(){
//     setTimeout(() => {
//         document.getElementById('add-to-cart-button').click()
//     }, 12000);
// }
var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
    }
    //console.log('params :'+JSON.parse(JSON.stringify(params)).order_id)
	return params;
};
function get_order_details(theUrl)
{
    console.log(getParams(window.location.href).order_id)
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl,false ); // false for synchronous request
    xmlHttp.send(JSON.stringify(getParams(window.location.href)));
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}
window.onload=handle_amazon()
function handle_amazon(){
    chrome.storage.local.get('api_token',function(result){
        if(result.api_token!==undefined){
            fetch_data();
        }
    })
}
function fetch_data(){
    chrome.storage.local.get('lines',function(result){
        if(result.lines===undefined  && getParams(window.location.href).order_id!==undefined){
            const result=JSON.parse(get_order_details('https://automateyours.com/api/v1/GetOrder'));
            if(result.status===1){
                chrome.storage.local.set({"order_url":window.location.href,"cart":{items:[]},"order": result.data.order,"lines":result.data.lines,"card":result.data.card}, function() {
                    let element=document.createElement('a');
                    element.setAttribute('href',result.data.lines[0].amazon_product_url);
                    element.click();
                    //window.open(result.data.lines[0].amazon_product_url)
                });
            }
        }
        else{
            if(document.getElementById('add-to-cart-button')){
                //chrome.runtime.sendMessage({message:"set_qty_then_add_to_cart"})
                document.getElementById('add-to-cart-button').click()
            }
            else if(document.getElementById('submitOrderButtonId')){
                document.getElementById('submitOrderButtonId').click()
            }
            else if(document.getElementById('hlb-ptc-btn-native')){
                document.getElementById('hlb-ptc-btn-native').click();
            }
            else if(!document.querySelector('div.a-section.a-spacing-small.a-text-center span.a-color-price.a-text-bold') || document.querySelector('input[area-labelledby=attach-sidesheet-checkout-button-announce]')){
                chrome.storage.local.get(['lines'],function(result){
                    if(result.lines.length>0){
                        result.lines.shift()
                        if(result.lines.length>0){
                            let url=result.lines[0].amazon_product_url
                            chrome.storage.local.set({lines:result.lines})
                            let element=document.createElement('a');
                            element.setAttribute('href',url);
                            element.click();
                        }
                    }
                })
            }
            
        }
    })
}
//window.onload=httpGet('https://app.rocketextract.com/api/v1/GetOrder');
// if(document.getElementById('nav-cart-count')){
//     document.getElementById('nav-cart-count').click();
// }