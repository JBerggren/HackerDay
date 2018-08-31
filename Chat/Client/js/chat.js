"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("https://appendhouse.contentowassum.se/chat/backend/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var date = new Date();

    var encodedMsg = user + " (" + date.getHours() + ":" + date.getMinutes() + "): " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").prepend(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    document.getElementById("messageInput").value ="";
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

var userInput = document.getElementById("userInput");
var messageInput = document.getElementById("messageInput");

if(window.localStorage){
    userInput.value = localStorage.getItem("username");
}

userInput.addEventListener("change",function(event){
    window.localStorage.setItem("username",userInput.value);
});