let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({ 
    target: { tabId: tab.id },
    files: ['content-script.js']  
  });
});

chrome.action.onClicked.addListener((tab) => {
    // In the following line, you should include the prefixes of implementations you want to test.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

    // Let us open our database
    const DBOpenRequest = window.indexedDB.open("ShopEverywhere", 4);

    // Gecko-only IndexedDB temp storage option:
    // var request = window.indexedDB.open("toDoList", {version: 4, storage: "temporary"});

    // these two event handlers act on the database being opened successfully, or not
    DBOpenRequest.onerror = function(event) {
      console.log("show your onerror");
    };

    DBOpenRequest.onsuccess = function(event) {
      // store the result of opening the database in the db variable. This is used a lot below
      db = DBOpenRequest.result;

      // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
      //displayData();
    };

    // This event handles the event whereby a new version of the database needs to be created
    // Either one has not been created before, or a new version number has been submitted via the
    // window.indexedDB.open line above
    // it is only implemented in recent browsers
    DBOpenRequest.onupgradeneeded = function(event) {
      let db = event.target.result;

      db.onerror = function(event) {
        console.log("show your onerror");
      };

      // Create an objectStore for this database

      let objectStore = db.createObjectStore("ShopEverywhere", { keyPath: "taskTitle" });

      // define what data items the objectStore will contain

      objectStore.createIndex("hours", "hours", { unique: false });
      objectStore.createIndex("minutes", "minutes", { unique: false });
      objectStore.createIndex("day", "day", { unique: false });
      objectStore.createIndex("month", "month", { unique: false });
      objectStore.createIndex("year", "year", { unique: false });

      objectStore.createIndex("notified", "notified", { unique: false });
    };


});