export class ButtonPopUp {
    constructor() {
        this._templete = templete;
        this._css = css;

        this._mainPopup = null;
        this._img = null;
        this._title = null;
        this._price = null;
        this._href = null;
    }

    build() {
        let div = document.createElement("div");
        div.className += "popup";
        div.id = "myPopup";
        div.innerHTML = this._templete;

        document.body.append(div);

        let style = document.createElement("style");
        style.appendChild(document.createTextNode(this._css));
        document.head.appendChild(style);

        this._mainPopup = document.getElementById("myPopup");
        this._img = document.getElementById("popup_img");
        this._title = document.getElementById("popup_title");
        this._price = document.getElementById("popup_price");

        this._img.src = chrome.runtime.getURL("images/get_started16.png")
    }

    setPopUp(json, numDropped)
    {
        console.log(json);
        console.log(numDropped);

        if(json["img"])
        {
            this._img.src = json["img"];
        }

        if(json["title"])
        {
            this._title.innerHTML = json["title"];
        }

        if(json["price"])
        {
            this._price.innerHTML = json["price"];
        }
    }

    clearPopUp()
    {
        this._img.src = chrome.runtime.getURL("images/get_started16.png");
        this._title.innerHTML = "title";
        this._price.innerHTML = "price";
    }

    togglePopUp()
    {
        console.log("toggle");
        console.log(this._mainPopup);
        this._mainPopup.classList.toggle("show");
    }
}

const templete = `
<div class = 'popup_item'>
<span class="fa fa-circle"></span><div><img id='popup_img'></img></div>
</div>
<div class = 'popup_item'>
<span class="fa fa-circle-thin"></span><div><div id='popup_title'>title</div></div>
</div>
<div class = 'popup_item'>
<span class="fa fa-circle-thin"></span><div><div id='popup_price'>price</div></div>
</div>
`;

const css = `
.popup {
    display : flex;
    justify-content: space-around;
    flex-direction : column;
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

.popup img {
    height: 100%;
    width: 100%;
}

.popup_item div {
    flex-grow : 2;
}

.popup > .popup_item {
    display : flex;
    justify-content: space-around;
    align-items : center;
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