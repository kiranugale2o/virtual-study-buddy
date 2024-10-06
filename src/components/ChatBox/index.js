"use client";
import { pusherClient } from "@/helpers/pusher";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ChatBox({ chat, ProfileUser, ConversationId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChat] = useState([]);
  const [converSationId, setCoversationId] = useState("");

  const getChatDetails = async () => {
    await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        chatId: ConversationId,
      }),
    }).then((res) =>
      res.json().then((res) => {
        console.log(res, "msd");

        setChat((...prevMsg) => [res.messages]);
        setMessages("");
        console.log("chat", chats);
      })
    );
  };

  //   useEffect(() => {
  //     if (converSationId !== "") getChatDetails();
  //   }, [ProfileUser, chat]);

  //   useEffect(() => {
  //     pusherClient.subscribe(chat?._id);

  //     const handleMessage = async (newMessage) => {
  //       setChat((prevChat) => {
  //         return {
  //           ...prevChat,
  //           messages: [...prevChat.messages, newMessage],
  //         };
  //       });
  //     };

  //     pusherClient.bind("new-message", handleMessage);

  //     return () => {
  //       pusherClient.unsubscribe(chat?._id);
  //       pusherClient.unbind("new-message", handleMessage);
  //     };
  //   }, [chat?._id]);

  //   useEffect(() => {
  //     var channel = pusherClient.subscribe(chat?._id);
  //     channel.bind("new-message", function (data) {
  //       setChat(JSON.stringify(data));
  //     });
  //   });
  //

  //   useEffect(() => {
  //     const channel = pusherClient.subscribe("chat");
  //     channel.bind(`message${chat?._id}`, (data) => {
  //       console.log("pusher", data);

  //       setMessages((prevMessages) => [...prevMessages, data.text]);
  //     });
  //   }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe("livechat");
    channel.bind(chat?._id, (data) => {
      setChat(data.messages);
    });
  }, [chat?._id]);

  useEffect(() => {
    getChatDetails();
    pusherClient.subscribe("chat");

    const handleMessage = async (data) => {
      setMessages((prevMessages) => [...prevMessages, data.text]);
    };

    pusherClient.bind(`message${chat?._id}`, handleMessage);

    return () => {
      pusherClient.unsubscribe("chat");
      pusherClient.unbind(`message${chat?._id}`, handleMessage);
    };
  }, [chat?._id]);
  function sendMessage() {
    const data = {
      senderId: ProfileUser?._id,
      text: message,
      photo: "",
      chatId: chat?._id,
    };
    fetch("/api/sendMessage", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          alert("send");

          // setMessages((prevMessages) => [...prevMessages, res.messages.text]);
        } else {
          alert("not send");
        }
      })
    );
  }
  return (
    <div
    // className={`chat-box ${chat._id === currentChatId ? "bg-blue-2" : ""}`}
    //onClick={() => router.push(`/chats/${chat._id}`)}
    >
      <div className="flex flex-col justify-between p-24">
        <div className="flex flex-col gap-1 p-10">
          <p className="text-base-bold">{chat.fullName}</p>

          <p className="text-small-bold">Started a chat</p>
          <Button
            onClick={() => {
              if (ConversationId !== "") {
                getChatDetails();
              }
            }}
          >
            Staart
          </Button>
          {chats && chats.length > 0 ? (
            <>
              {chats[0].map((msg) => {
                return (
                  <>
                    <div
                      className={`message ${
                        msg.senderId === ProfileUser?._id
                          ? "user-message"
                          : "bot-message"
                      }`}
                    >
                      <span>{msg.text}</span>
                    </div>
                  </>
                );

                //   <div
                //     className={`text-15px text-red-500 w-[100px] ${
                //       msg.senderId === ProfileUser?._id
                //         ? "bg-green-400"
                //         : "bg-gray-400"
                //     } ${
                //       msg.senderId === ProfileUser?._id
                //         ? "mr-10"
                //         : " mt-10 ml-20"
                //     }`}
                //   >
                //     {msg.text}
                //   </div>
              })}
            </>
          ) : null}
          {messages && messages.length > 0 ? (
            <>
              {messages.map((msg) => {
                return (
                  <div className="message text-15px text-red-500 user-message">
                    {msg}
                  </div>
                );
              })}
            </>
          ) : null}
          <input
            type="text"
            className="border p-5"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <br />

          <div className="flex ">
            <Button onClick={getChatDetails}>get Live Chat</Button>
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>

      <div>
        {/* <p className="text-base-light text-grey-3">
          {!lastMessage
            ? format(new Date(chat?.createdAt), "p")
            : format(new Date(chat?.lastMessageAt), "p")}
        </p> */}
      </div>
    </div>
  );
}
