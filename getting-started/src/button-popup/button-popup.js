export class ButtonPopUp {
    constructor() {
        this._templete = templete;
        this._css = css;

        this._mainPopup = null;
        this._img = null;
        this._title = null;
        this._price = null;
        this._href = null;

        this._json = {
            'img' : chrome.runtime.getURL("images/no-item.jpg"),
            'href' : null,
            'title' : "title",
            'price' : "price"
        };

        this._key = () =>new Date();
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

        this.clearJson();
        this.setPopUp();
        this.moveIndicator(0);
    }

    bindListener() {
        for(let i=1; i <= 3; i++) {
            let elem = document.querySelector(`#myPopup > div:nth-child(${i}) > span`);
            elem.addEventListener("click", (event)=>{
                console.log(event);
                let parNode = document.querySelector(`#myPopup > div:nth-child(${i}) > div`);
                let originNode = parNode.firstChild;
                let inputNode = document.createElement('input'); 
                inputNode.addEventListener('change', ()=>this.onChange(parNode, inputNode, originNode));

                this.moveIndicator(i-1);
                parNode.replaceChild(inputNode,parNode.firstChild);
            })
        }
    }

    onChange(parNode, inputNode, originNode) {
        console.log(inputNode);
        console.log(originNode);
        alert(inputNode.value);
        console.log(this);
        if(originNode.id == "popup_img") {
            console.log("img");
            this._json["img"] = inputNode.value;
        }
        else if(originNode.id == "popup_title") {
            this._json["title"] = inputNode.value;
        }
        else if(originNode.id == "popup_price") {
            this._json["price"] = inputNode.value;
        }

        parNode.replaceChild(originNode, parNode.firstChild);
        this.setPopUp();
    }

    setPopUp()
    {
        if(this._json["img"])
        {
            this._img.src = this._json["img"];
        }

        if(this._json["title"])
        {
            this._title.innerHTML = this._json["title"];
        }

        if(this._json["price"])
        {
            this._price.innerHTML = this._json["price"];
        }
    }

    togglePopUp()
    {
        console.log("toggle");
        console.log(this._mainPopup);
        this._mainPopup.classList.toggle("show");
    }

    moveIndicator(numDropped)
    {
        for(let i = 1; i <= 3; i++) {
            let prevElem = document.querySelector(`#myPopup > div:nth-child(${i}) > span`);

            prevElem.classList.remove("fa-circle");
            prevElem.classList.add("fa-circle-thin");
        }

        let elem = document.querySelector(`#myPopup > div:nth-child(${numDropped + 1}) > span`);

        elem.classList.remove("fa-circle-thin");
        elem.classList.add("fa-circle");

        console.log(elem);
    }

    setDataToJson(elem, numDropped) {
        if(numDropped == 0 && elem.tagName == "IMG")
        {
            this._json["img"] = elem.src;
        }
        else if(numDropped == 1)
        {
            if(elem.tagName) elem = elem.textContent;
            this._json["title"] = elem;
        }
        else if(numDropped == 2)
        {
            if(elem.tagName) elem = elem.textContent;
            this._json["price"] = elem
        }
    }

    setJsonToStorage() {
        chrome.storage.sync.set({ [this._key()] : this._json}, ()=>{
            console.log('Value is set to ', this._json);
        });
    }

    clearJson() {
        this._json = {
            'img' : chrome.runtime.getURL("images/no-item.jpg"),
            'href' : "href",
            'title' : "title",
            'price' : "price"
            };
    }
}

const templete = `
<div class = 'popup_item'>
<span class="fa fa-circle-thin"></span><div><img id='popup_img'></img></div>
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

.popup input {
    background : white;
}

.popup > div > div {
    padding : 4px;
}

.popup_item div {
    flex-grow : 2;
}

.popup_item > span {
    cursor : pointer;
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

#popup_title {
    background : white;
    color : black;
}

#popup_price {
    background : white;
    color : black;
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