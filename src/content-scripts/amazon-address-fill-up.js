function press_pop_add_address(){
    if(document.getElementById('add-new-address-popover-link')){
        setTimeout(()=>{
            let element=document.getElementById('add-new-address-popover-link')
            element.click()
        },2000)
    }
}
function fill_form(){
    console.log('hello from form fillup')
    setTimeout(()=>{
        chrome.storage.local.get(['order'],function(result){
            document.getElementById('address-ui-widgets-enterAddressFullName').setAttribute('value',result.order.ship_name)
            document.getElementById('address-ui-widgets-enterAddressLine1').setAttribute('value',result.order.ship_address1)
            document.getElementById('address-ui-widgets-enterAddressLine2').setAttribute('value',result.order.ship_address2)
            document.getElementById('address-ui-widgets-enterAddressCity').setAttribute('value',result.order.ship_city)
            document.getElementById('address-ui-widgets-enterAddressStateOrRegion').setAttribute('value',result.order.ship_state)
            document.getElementById('address-ui-widgets-enterAddressPostalCode').setAttribute('value',result.order.ship_postalCode)
            document.getElementById('address-ui-widgets-enterAddressPhoneNumber').setAttribute('value',result.order.ship_phone)
            document.getElementById('address-ui-widgets-use-as-my-default').setAttribute('checked',true);
        })
    },8000)
}
function press_country_combo(){
    setTimeout(()=>{
        let element=document.querySelector('span.a-button.a-button-dropdown.a-spacing-none.address-ui-widgets-desktop-form-field-full-width span.a-button-text.a-declarative')
        element.click()
    },4000)
}
function set_country(){
    chrome.storage.local.get(['order'],function(result){
        //console.log(result.order)
        setTimeout(()=>{
            let element=document.getElementById('1_dropdown_combobox')
            let element2=document.querySelector('div.a-popover-inner ul.a-nostyle.a-list-link')
            if(element){
                element.childNodes.forEach(child=>{
                    if(child.hasChildNodes()){
                        console.log(child.childNodes[0].getAttribute('data-value'))
                        if(child.childNodes[0].getAttribute('data-value')===result.order.ship_country){
                            child.firstChild.click();
                        }
                    }
                    // if(child.firstChild.getAttribute('data-value')==="USA"){
                    //     child.firstChild.click();
                    // }
                })
            }
            else if(element2){
                element2.childNodes.forEach(child=>{
                    if(child.hasChildNodes()){
                        console.log()
                        if(JSON.parse(child.firstChild.getAttribute('data-value')).stringVal===result.order.ship_country){
                            child.firstChild.click();
                        }
                    }
                    // if(child.firstChild.getAttribute('data-value')==="USA"){
                    //     child.firstChild.click();
                    // }
                })
            }
            
        },6000)
    });
}
function press_add_address(){
    if(document.getElementById('address-ui-widgets-form-submit-button')){
        setTimeout(()=>{
            let element=document.getElementById('address-ui-widgets-form-submit-button');
            element.firstChild.click();
        },10000)
    }
}
function final_press_add_address(){
    if(document.getElementById('address-ui-widgets-form-submit-button')){
        setTimeout(()=>{
            let element=document.getElementById('address-ui-widgets-form-submit-button');
            chrome.runtime.sendMessage({message:"place_order"})
            element.firstChild.click();
        },12000)
    }
}
window.onload=Promise.resolve(press_pop_add_address()).then(()=>Promise.resolve(press_country_combo()).then(()=>Promise.resolve(set_country()).then(()=>Promise.resolve(fill_form()).then(()=>Promise.resolve(press_add_address()).then(()=>Promise.resolve(final_press_add_address()))))))