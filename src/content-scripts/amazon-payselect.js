function one(){
    setTimeout(()=>{
        console.log('hi from payselect')
        if(document.querySelector('span.a-declarative a.a-link-emphasis')){
            //console.log(document.querySelector('span.a-declarative a.a-link-emphasis'))
            document.querySelector('span.a-declarative a.a-link-emphasis').click();
        }
    },2000)
}

function two(){
    chrome.storage.local.get(['card'],function(result){
        setTimeout(() => {
            let number=document.getElementsByName('addCreditCardNumber')[0]
            console.log(number)
            number.setAttribute('value',result.card.card_no)
            let name=document.getElementsByName('ppw-accountHolderName')[0]
            name.setAttribute('value',result.card.card_name)
            console.log(name)
        }, 4000);
    })
}
window.onload=Promise.resolve(one()).then(()=>Promise.resolve(two()))