(async() => {
    const src = chrome.runtime.getURL('main.js');
    const contentScript = await import(src);
    console.log("OK");
    contentScript.main();

    console.log("OK");
})();



