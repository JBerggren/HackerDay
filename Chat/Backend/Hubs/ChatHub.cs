using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public static List<MessageItem> messages = new List<MessageItem>();
        public const int MessageLimit = 10;
        public async Task SendMessage(string user, string message)
        {
            var msg = new MessageItem(user,message);
            messages.Add(msg);
            await Clients.All.SendAsync("ReceiveMessage", msg.Time,msg.Sender,msg.Message);
            if(message.Length > 5){
                messages = messages.GetRange(0,5);
            }
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReceiveMessage",DateTime.Now,"System",$"Welcome! Here are the last {MessageLimit} messages");
            var nrOfMessages = messages.Count;
            for(var i=0;i< nrOfMessages;i++){
                var msg = messages[i];
                await Clients.Caller.SendAsync("ReceiveMessage",msg.Time,msg.Sender,msg.Message);
            }
            await base.OnConnectedAsync();
        }
    }

    public class MessageItem{
        public MessageItem(string sender,string msg){
            Sender = sender;
            Message = msg;
            Time = DateTime.Now;
        }
        public string Sender {get;set;}
        public string Message {get;set;}
        public DateTime Time {get;set;}
    }
}