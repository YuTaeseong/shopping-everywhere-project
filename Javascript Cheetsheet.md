객체 프로퍼티 설정

[계산된 프로퍼티](https://ko.javascript.info/object#ref-733)

async / await

자바 스크립트를 할 때마다 항상 신경쓰는 부분.

callback

then / catch

async / await

- async await chain
```
    async setJsonToStorage()
    {
        await this.setKey();
        console.log(this._key);
        chrome.storage.sync.set({ [this._key] : this._json}, ()=>{
            console.log('Value is set to ', this._json);
        });
    }
```

Promise

- Promise chain

callback 안의 this

-
```
    setTimeout(()=>this._popUp.togglePopUp(), 3000);
```

