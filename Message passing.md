Message passing

백그라운드 페이지에 신호를 전달하는 방법

runtime.sendMessage : content script로부터 extension에 보낼 때
tabs.sendMessage : extension으로 부터 content script로 보낼 때 

메시지를 받기 위해서는 Listener를 등록해야한다.

runtime.connect : 
tabs.connect :

메시지를 받기 위해서는 Listener를 등록해야한다.

그외 extension간에 메시지를 주고 받는 법
다른 웹페이지로부터 메시지를 주고 받는 법이 있다.

Browser Action

Page Action

Content script

https://developer.chrome.com/docs/extensions/mv3/architecture-overview/