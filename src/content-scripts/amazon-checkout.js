console.log('hello from checkout script')
function click_change_address(){
    if(document.getElementsByClassName('change-address-popover-span').length>0){
        let element=document.querySelector("span.change-address-popover-span a.change-address-popover-link.a-declarative.a-size-mini")
        if(element){
            setTimeout(()=>{
                element.click();
                window.location.reload();
            },2000)
        }
    }
    else if(document.getElementById('addressChangeLinkId')){
        setTimeout(()=>{
            let element=document.getElementById('addressChangeLinkId')
            element.click();
        },2000)
    }
}
function click_add_address(){
    if(document.getElementById('add-new-address-popover-link')){
        setTimeout(()=>{
            let element=document.getElementById('add-new-address-popover-link')
            console.log('click_pop_add_address')
            element.click()
        },5000)
    }
    else if(document.querySelector('div.select-address-slot.aok-align-top.a-column.a-span4 div.add-address-button div')){
        setTimeout(()=>{
            let add_address=document.querySelector('div.select-address-slot.aok-align-top.a-column.a-span4 div.add-address-button div')
            console.log('click_prvs_add_address')
            add_address.click();
        },5000)
    }
}

window.onload=Promise.resolve(click_change_address()).then(()=>Promise.resolve(click_add_address()));