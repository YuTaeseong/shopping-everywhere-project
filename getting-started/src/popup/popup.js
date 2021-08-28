// Initialize butotn with users's prefered color
let run = document.getElementById("run");
let view = document.getElementById("view");

// When the button is clicked, inject setPageBackgroundColor into current page
run.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  console.log("activated");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/content-script.js'],
  });
});

view.addEventListener("click", async () => {
  chrome.tabs.create({
    url: 'src/view/view.html'
  });
});