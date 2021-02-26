console.log("hello from amazon add to cart script")
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
        
//     }, 12000);
// }

//window.onload=Promise.resolve(one()).then(()=>Promise.resolve(two()).then(()=>Promise.resolve(three()))
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
function press_check_out(){
    setInterval(()=>{
        if(document.querySelector('input[aria-labelledby=attach-sidesheet-checkout-button-announce]')!==undefined){
            let element=document.querySelector('input[aria-labelledby=attach-sidesheet-checkout-button-announce]');
            console.log(element)
            element.click();
        }
    },2000)
}
window.onload=press_check_out();