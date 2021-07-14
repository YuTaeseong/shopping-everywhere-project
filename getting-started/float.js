export class FloatingButton
{
    constructor(popUp) {
        this._templete = `<div class="float" id="menu-share">
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

        this._numDropped = 0;
        this._json = {};
        this._mainButton = null;
        this._plusButton = null;
        this._minusButton = null;
        this._css = `.float{
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

        this._popUp = popUp;
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
            this.onDrop(event, popUp);
        });
    }

    onDrop(event, popUp) {
        let elem = this.getDroppedElem(event);
        setDataToJson(elem, this._numDropped);
        popUp.setPopUp(this._json, this._numDropped);
        this._numDropped = (this._numDropped + 1)%3;
        popUp.togglePopUp();
        setTimeout(popUp.togglePopUp, 3000);
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
}