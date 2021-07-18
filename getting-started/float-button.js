export class FloatingButton
{
    constructor(popUp) {
        this._templete = templete;
        this._numDropped = 0;
        this._json = {
            'img' : null,
            'href' : null,
            'title' : null,
            'price' : null
            };

        this._key = async ()=>{
            let ret = await this.getJsonFromStorage();
            return Object.keys(ret).length;
        };

        this._mainButton = null;
        this._plusButton = null;
        this._minusButton = null;
        this._css = css;
        this._popUp = popUp;

        console.log(this._popUp);
    }

    build() {
        let div = document.createElement("div");
        div.innerHTML = this._templete;
    
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
    
        document.head.append(link);
        document.body.append(div);

        let style = document.createElement("style");
        style.appendChild(document.createTextNode(this._css));
        document.head.appendChild(style);

        this._mainButton = document.getElementsByClassName("float")[0];
        this._plusButton = document.getElementsByClassName("fa-plus")[0];
        this._minusButton = document.getElementsByClassName("fa-minus")[0];
    }

    bindListener() {
        this._mainButton.addEventListener("dragover", (event)=>{
            event.preventDefault();
        });
            
        this._mainButton.addEventListener("drop", (event)=>{
            event.preventDefault();
            this.onDrop(event);
        });

        this._mainButton.addEventListener("click", (event)=>{
            console.log(event.type);
            console.log(event.target);
        
            this._popUp.togglePopUp("show");
        });

        this._plusButton.addEventListener("click", (event)=>{
            console.log(event.type);
            this.setJsonToStorage();
            this._popUp.clearPopUp();
            this.clearJson();
        });
            
        this._minusButton.addEventListener("click", async (event)=>{
        console.log(event.type);
        let ret = await this.getJsonFromStorage();
        
        console.log(ret);
        console.log(Object.keys(ret));
        console.log(Object.keys(ret).length);
        });
    }

    onDrop(event) {
        let elem = this.getDroppedElem(event);
        this.setDataToJson(elem, this._numDropped);
        this._popUp.setPopUp(this._json, this._numDropped);
        this._numDropped = (this._numDropped + 1)%3;
        this._popUp.togglePopUp();
        console.log("2")
        setTimeout(()=>this._popUp.togglePopUp(), 3000);
    }

    getDroppedElem(event)
    {
        let id = event.dataTransfer.getData('text/plain');
        let draggedItem = document.getElementById(id);

        if(draggedItem)
            draggedItem.removeAttribute("id");
        else
            draggedItem = id;

        return draggedItem;
    }

    setDataToJson(elem, numDropped)
    {
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

    setJsonToStorage()
    {
        chrome.storage.sync.set({ [this._key()] : this._json}, ()=>{
        console.log('Value is set to ' + this._json);
        });
    }

    async getJsonFromStorage()
    {
        return new Promise((resolve, reject)=>{
          try {
              chrome.storage.sync.get(null, (result)=>{
              //console.log("yes", result);
              resolve(result); })
          }
          catch (error) {
            reject(error);
          }
        });
    }

    clearJson()
    {
        this._json = {
            'img' : null,
            'href' : null,
            'title' : null,
            'price' : null
            };
    }
}

const templete = `<div class="float" id="menu-share">
<i class="fa fa-bookmark my-float"></i>
</div>
<ul class="ul-float">
<li><div>
<i class="fa fa-plus my-float"></i>
</div></li>
<li><div>
<i class="fa fa-minus my-float"></i>
</div></li>
</ul>`;

const css = `.float{
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
    cursor : pointer;
}

ul.ul-float{
    position:fixed;
    right:80px;
    padding-right:20px;
    bottom:40px;
    z-index:10000;
}

ul.ul-float li{
    float:left;
    list-style:none;
    margin-right:10px;
}

ul.ul-float li div{
    background-color:#a0d556;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
    width:60px;
    height:60px;
    display:block;
    cursor : pointer;
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