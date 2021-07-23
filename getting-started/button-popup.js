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
        let div = document.createElement("ul");
        div.className += "popup";
        div.id = "myPopup";
        div.innerHTML = this._templete;

        document.body.append(div);

        let style = document.createElement("style");
        style.appendChild(document.createTextNode(this._css));
        document.head.appendChild(style);

        this._mainPopup = document.getElementById("myPopup");
        this._img = document.getElementById("popupimg");
        this._title = document.getElementById("popuptitle");
        this._price = document.getElementById("popupprice");

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
<li><img id='popupimg'></img></li>
<li><div id='popuptitle'>title</div></li>
<li><div id='popupprice'>price</div></li>
`;

const css = `
.popup {
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