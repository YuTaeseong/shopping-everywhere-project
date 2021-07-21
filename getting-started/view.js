async function constructView() {
  let result = await getJsonFromStorage();
  console.log(result);
  for (let elem in result) {
    console.log(elem);
    setDataToHTML(elem, result[elem]);
  }
}

async function getJsonFromStorage()
{
    return new Promise((resolve, reject)=>{
      try {
          chrome.storage.sync.get(null, (result)=>{
          console.log("yes", result);
          resolve(result); })
      }
      catch (error) {
        reject(error);
      }
    });
}

function deleteDataFromStorage(key)
{
  chrome.storage.sync.remove(key, (result)=>console.log(result));
}

function setDataToHTML(key, data)
{ 
  let templete = document.createElement("li");
  let image = document.createElement("img");
  let title = document.createElement("div");
  let price = document.createElement("div");
  let deleteButton = document.createElement("div");

  image.src = data['img'];
  title.textContent = data['title'];
  price.textContent = data['price'];
  deleteButton.textContent = "delete";
  deleteButton.className += "delete";

  templete.appendChild(image);
  templete.appendChild(title);
  templete.appendChild(price);
  templete.appendChild(deleteButton);

  templete.id = key;

  let ul = document.getElementsByTagName("UL")[0];
  ul.appendChild(templete);
}

// Initialize the page by constructing the color options
constructView();
