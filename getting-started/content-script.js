var div = document.createElement("div");
div.innerHTML = "<div href='#' class='float'> <i class='fa fa-plus my-float'></i> </div>";
var a = div.getElementsByClassName("float");
var i = div.getElementsByClassName("my-float");

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";

a[0].style.cssText = `position:fixed;
                width:60px;
                height:60px;
                bottom:40px;
                right:40px;
                background-color:#0C9;
                color:#FFF;
                border-radius:50px;
                text-align:center;
                box-shadow: 2px 2px 3px #999;
`;             

i[0].style.cssText = `margin-top:22px;`;

document.head.append(link);
document.body.append(div);

var div = document.createElement("div");
div.className += "popup";
div.id = "myPopup";
div.innerHTML = `
    <img></img>
    <div>title</div>
    <div>price</div>
`;

document.body.append(div);
setPopUpCSS();

var target = document.getElementsByClassName("float");
target = target[0];
console.log(target);

document.addEventListener("dragstart", (event)=>{
    console.log(event.target);
    if(event.target.tagName){
        event.target.id = "draggedItem";
        event.dataTransfer.setData("text/plain", event.target.id);
    }else{
        event.dataTransfer.setData("text/plain", event.target.data);
    }
});

target.addEventListener("dragover", (event)=>{
    event.preventDefault();
    //event.dataTransfer.setData("text", event.target.id);
    console.log(event.type);
    console.log(event.target);
});

target.addEventListener("drop", (event)=>{
    event.preventDefault();
    console.log(event.type);
    console.log(event.dataTransfer.getData('text/plain'));
    var id = event.dataTransfer.getData('text/plain');
    var draggedItem = document.getElementById(id);
    if(draggedItem)
        draggedItem.removeAttribute("id");
});

target.addEventListener("click", (event)=>{
    console.log(event.type);
    console.log(event.target);

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
});

function setPopUpCSS()
{
    var css = `.popup {
        visibility: hidden;
        width: 160px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        position: fixed;
        z-index: 1;
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

    var style = document.createElement("style");
    style.appendChild(document.createTextNode(css));

    document.head.appendChild(style);
}

console.log("test success");

