console.log("hello from amazon add to cart script")
// window.onload=()=>{
//     chrome.storage.local.get(['cart','lines','order_url'],function(result){
//         result.cart.items.push(result.lines[0])
//         result.lines.shift();
//         chrome.storage.local.set({cart:result.cart,lines:result.lines,order_url:result.order_url})
//         if(result.lines.length>0){
//             result.order_url=result.lines[0].amazon_product_url
//         }
//         document.getElementById('add-to-cart-button').click();
//     })
// }