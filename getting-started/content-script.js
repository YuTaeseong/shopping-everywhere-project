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

var target = document.getElementsByClassName("float");
target = target[0];
console.log(target);

document.addEventListener("dragstart", (event)=>{
    console.log(event.target);
    if(event.target.tagName == 'IMG')
    {
        event.dataTransfer.setData("text/uri-list", event.target.src);
    }
    else
    {
        event.dataTransfer.setData("text/html", event.target);
    }
    console.log(event.target);

});

target.addEventListener("dragover", (event)=>{
    event.preventDefault();
    event.dataTransfer.setData("text", event.target.id);
    console.log(event.type);
    console.log(event.target);
});

target.addEventListener("drop", (event)=>{
    event.preventDefault();
    console.log(event.type);
    console.log(event.dataTransfer.mozSourceNode);
    for(var i in event.dataTransfer.items)
    {
        console.log(i);
    }
    console.log(event.dataTransfer.getData('text/html'));
    console.log(event.dataTransfer.getData('text/plain'));
});

target.addEventListener("click", (event)=>{
    console.log(event.type);
    console.log(event.target);
});

console.log("test success");

