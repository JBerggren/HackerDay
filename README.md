# HackerDay

## 2018-08-31
Chat  
Dotnet create webapi för att skapa backend  
Gick igenom tutorialen på https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-2.1&tabs=visual-studio-code för signalr men skapade en separat webb. Gick också igenom avsnittet "Cross-origin resource sharing" eftersom jag då hostade på olika portar.  
  
När jag fått igång det lokalt så körde jag dotnet publish -c release och kopierade över mappen som skapades till en mapp under iis rooten på appendhouse. Där behövde jag installera dotnet core runtime för att få den att köra. Jag behövde också göra katalogen tilll "application".  
  
Server igång på https://appendhouse.contentowassum.se/chat/backend/chatHub och klienten på https://appendhouse.contentowassum.se/chat/client

Steg 2:  
Snygga till klienten  
Använde https://bulma.io för grund style och bakgrund från https://uigradients.com/#GradeGrey. Använde app icon från iconfinder.com. 

Steg 3:
Gjorde den till PWA så den kan installeras som app i IOS och Android. Hadlar om att länka in manifest.json och registrera en serviceworker. För att lägga till på IOS behöver man öppna siten i Safari
