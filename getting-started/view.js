async function constructOptions() {
  let result = await getJsonFromStorage();
  console.log(result);
  for (let elem in result) {
    console.log(elem);
    setDataToHTML(result[elem]);
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

function setDataToHTML(data)
{ 
  let templete = document.createElement("li");
  let image = document.createElement("img");
  let title = document.createElement("div");
  let price = document.createElement("div");

  image.src = data['img'];
  title.textContent = data['title'];
  price.textContent = data['price'];

  templete.appendChild(image);
  templete.appendChild(title);
  templete.appendChild(price);

  let ul = document.getElementsByTagName("UL")[0];
  ul.appendChild(templete);
}

// Initialize the page by constructing the color options
constructOptions();
