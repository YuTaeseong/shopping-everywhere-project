var popUpCss = `.popup {
                visibility: hidden;
                width: 160px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                position: fixed;
                z-index: 10000;
                bottom: 120px;
                right: 40px;
                }

            .popup::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 70%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
                }

                .show {
                visibility: visible;
                -webkit-animation: fadeIn 1s;
                animation: fadeIn 1s;
                }

                @-webkit-keyframes fadeIn {
                    from {opacity: 0;} 
                    to {opacity: 1;}
                }
                
                @keyframes fadeIn {
                from {opacity: 0;}
                to {opacity:1 ;}
                }`

var floatingButtonCss = `.float{
                        position:fixed;
                        width:60px;
                        height:60px;
                        bottom:40px;
                        right:40px;
                        background-color:#a0d556;
                        color:#FFF;
                        border-radius:50px;
                        text-align:center;
                        box-shadow: 2px 2px 3px #999;
                        z-index:10000;
                        animation: bot-to-top 2s ease-out;
                    }

                    ul.ul-float{
                        position:fixed;
                        right:80px;
                        padding-right:20px;
                        bottom:40px;
                        z-index:100;
                    }

                    ul.ul-float li{
                        float:left;
                        list-style:none;
                        margin-right:10px;
                    }

                    ul.ul-float li a{
                        background-color:#a0d556;
                        color:#FFF;
                        border-radius:50px;
                        text-align:center;
                        box-shadow: 2px 2px 3px #999;
                        width:60px;
                        height:60px;
                        display:block;
                    }

                    ul.ul-float:hover{
                        visibility:visible!important;
                        opacity:1!important;
                    }


                    .my-float{
                        font-size:20px!important;
                        margin-top:18px;
                    }

                    div#menu-share + ul{
                    visibility: hidden;
                    }

                    div#menu-share:hover + ul{
                    visibility: visible;
                    animation: scale-in 0.5s;
                    }

                    div#menu-share i{
                        animation: rotate-in 0.5s;
                    }

                    div#menu-share:hover > i{
                        animation: rotate-out 0.5s;
                    }

                    @keyframes bot-to-top {
                        0%   {bottom:-40px}
                        50%  {bottom:40px}
                    }

                    @keyframes scale-in {
                        from {transform: scale(0);opacity: 0;}
                        to {transform: scale(1);opacity: 1;}
                    }

                    @keyframes rotate-in {
                        from {transform: rotate(0deg);}
                        to {transform: rotate(360deg);}
                    }

                    @keyframes rotate-out {
                        from {transform: rotate(360deg);}
                        to {transform: rotate(0deg);}
                    }`;

function createFloatingButton()
{
    setCSS(floatingButtonCss);
    var div = document.createElement("div");
    div.innerHTML = `<div class="float" id="menu-share">
                    <i class="fa fa-bookmark my-float"></i>
                    </div>
                    <ul class="ul-float">
                    <li><a href="#">
                    <i class="fa fa-plus my-float"></i>
                    </a></li>
                    <li><a href="#">
                    <i class="fa fa-minus my-float"></i>
                    </a></li>
                    </ul>`;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";

    document.head.append(link);
    document.body.append(div);
}

function createPopUp()
{
    setCSS(popUpCss);
    var div = document.createElement("div");
    div.className += "popup";
    div.id = "myPopup";
    div.innerHTML = `
        <img id='popupimg'></img>
        <div id='popuptitle'>title</div>
        <div id='popupprice'>price</div>
    `;

    document.body.append(div);
}



createFloatingButton();
createPopUp();
var target = document.getElementsByClassName("float")[0];
var plusTarget = document.getElementsByClassName("fa-plus")[0];
var minusTarget = document.getElementsByClassName("fa-minus")[0];
var key = 0;

console.log(target);

document.addEventListener("dragstart", (event)=>{
    if(event.target.tagName){
        event.target.id = "draggedItem";
        event.dataTransfer.setData("text/plain", event.target.id);
    }else{
        console.log(event.target);
        console.log(event.target.data);
        var text = event.target.data;
        event.dataTransfer.setData("text/plain", text);
    }
});

target.addEventListener("dragover", (event)=>{
    event.preventDefault();
});

target.addEventListener("drop", (event)=>{
    event.preventDefault();
    onDrop(event);
});

target.addEventListener("click", (event)=>{
    console.log(event.type);
    console.log(event.target);

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
});

plusTarget.addEventListener("click", (event)=>{
    console.log(event.type);
    setJsonToStorage(key, json);
    clearPopUp();
});

minusTarget.addEventListener("click", (event)=>{
    console.log(event.type);
    var ret = getJsonFromStorage();

    console.log(ret);
});

var numDropped = 0;
var json = {
    'img' : null,
    'href' : null,
    'title' : null,
    'price' : null
};

function onDrop(event)
{
    var elem = getDroppedElem(event);
    setDataToJson(elem, numDropped);
    setPopUp(json, numDropped);
    numDropped = (numDropped + 1)%3;
    togglePopUp();
    setTimeout(togglePopUp, 3000);
}

function getDroppedElem(event)
{
    var id = event.dataTransfer.getData('text/plain');
    var draggedItem = document.getElementById(id);
    if(draggedItem)
        draggedItem.removeAttribute("id");
    else
        draggedItem = id;

    return draggedItem;
}

function setDataToJson(elem, numDropped)
{
    if(numDropped == 0 && elem.tagName == "IMG")
    {
        json["img"] = elem.src;
    }
    else if(numDropped == 1)
    {
        if(elem.tagName) elem = elem.textContent;
        json["title"] = elem;
    }
    else if(numDropped == 2)
    {
        if(elem.tagName) elem = elem.textContent;
        json["price"] = elem
    }
}

function setPopUp(json, numDropped)
{
    console.log(json);
    console.log(numDropped);
    var popup = document.getElementById("myPopup");
    if(json["img"])
    {
        var popupimg = document.getElementById("popupimg");
        popupimg.src = json["img"];
    }

    if(json["title"])
    {
        var popuptitle = document.getElementById("popuptitle");
        popuptitle.innerHTML = json["title"];
    }

    if(json["price"])
    {
        var popupprice = document.getElementById("popupprice");
        popupprice.innerHTML = json["price"];
    }
}

function clearPopUp()
{
    var popupimg = document.getElementById("popupimg");
    popupimg.src = null;

    var popuptitle = document.getElementById("popuptitle");
    popuptitle.innerHTML = null;

    var popupprice = document.getElementById("popupprice");
    popupprice.innerHTML = null;
    
}

function togglePopUp()
{
    console.log("toggle");
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function setCSS(cssText)
{
    var css = cssText;
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
}

function setJsonToStorage(key, json)
{
    chrome.storage.sync.set({ [key] : json}, ()=>{
        console.log('Value is set to ' + json);
    });
}

function getJsonFromStorage()
{
    return chrome.storage.sync.get((result)=>{
        console.log(result);
        return result;
    });
}

console.log("test success");

