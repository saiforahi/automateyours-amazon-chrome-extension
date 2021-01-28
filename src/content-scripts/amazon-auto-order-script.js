console.log('Hello from the amazon-auto-order-script')
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
    // console.log(JSON.parse(xmlHttp.responseText).product_url);
    // window.open(JSON.parse(xmlHttp.responseText).product_url);
    // fetch(theUrl,{headers:{"content-type":"application/json; charset=UTF-8"},body:{order_id:"1"},method:"POST"}).then(response=>{console.log(response.json())})
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
                    console.log(result.data.order)
                    console.log(result.data.lines)
                    let element=document.createElement('a');
                    element.setAttribute('href',result.data.lines[0].amazon_product_url);
                    element.click();
                    //window.open(result.data.lines[0].amazon_product_url)
                });
            }
        }
        else{
            console.log('else block')
            if(document.getElementById('add-to-cart-button')){
                document.getElementById('add-to-cart-button').click();
            }
            else if(document.getElementById('hlb-ptc-btn-native')){
                document.getElementById('hlb-ptc-btn-native').click();
            }
            else{
                chrome.storage.local.get(['lines'],function(result){
                    if(result.lines.length>0){
                        console.log(result.lines)
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