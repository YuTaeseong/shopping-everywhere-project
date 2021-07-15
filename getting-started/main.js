import { ButtonPopUp } from "./button-popup.js";
import {FloatingButton} from "./float-button.js";

export function main()
{
    let popUp = new ButtonPopUp();
    let floatingButton = new FloatingButton(popUp);

    popUp.build();
    floatingButton.build();

    document.addEventListener("dragstart", (event)=>{
        if(event.target.tagName){
            event.target.id = "draggedItem";
            event.dataTransfer.setData("text/plain", event.target.id);
        }else{
            console.log(event.target);
            console.log(event.target.data);
            let text = event.target.data;
            event.dataTransfer.setData("text/plain", text);
        }
    });

    floatingButton.bindListener();

    console.log("test success");
}