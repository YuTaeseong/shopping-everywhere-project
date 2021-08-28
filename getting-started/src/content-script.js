(async() => {
    const src = chrome.runtime.getURL('src/main.js');
    const contentScript = await import(src);
    console.log("OK");
    contentScript.main();

    console.log("OK");
})();



