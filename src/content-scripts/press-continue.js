if(document.getElementsByClassName('sosp-continue-button a-button a-button-primary a-button-span12 a-padding-none  continue-button').length>0){
    console.log(document.getElementsByClassName('sosp-continue-button a-button a-button-primary a-button-span12 a-padding-none  continue-button'))
    let element=document.getElementsByClassName('sosp-continue-button a-button a-button-primary a-button-span12 a-padding-none  continue-button')[0];
    //chrome.runtime.sendMessage({message:"place_order"})
    console.log(element)
    element.click();
}