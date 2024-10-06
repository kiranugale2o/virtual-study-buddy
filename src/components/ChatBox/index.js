"use client";
import { pusherClient } from "@/helpers/pusher";
import { useEffect, useState } from "react";

export default function ChatBox({ chat, ProfileUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChat] = useState([]);
  const [converSationId, setCoversationId] = useState("");

  const getChatDetails = async () => {
    await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        chatId: converSationId,
      }),
    }).then((res) =>
      res.json().then((res) => {
        console.log(res, "msd");

        setChat((...prevMsg) => [...prevMsg, res.messages]);
        console.log(chats, "chats");
      })
    );
  };

  useEffect(() => {
    if (converSationId !== "") getChatDetails();
  }, [message]);

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
          setCoversationId(res.ChatDetailsID);
          //   getChatDetails();
          setMessage("");
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
      <div className="chat-info">
        <div className="flex flex-col gap-1">
          <p className="text-base-bold">{chat.fullName}</p>

          <p className="text-small-bold">Started a chat</p>
          {chats && chats.length > 0 ? (
            <>
              {chats[1].map((msg) => {
                return <div className="text-15px text-red-500">{msg.text}</div>;
              })}
            </>
          ) : null}
          {messages && messages.length > 0 ? (
            <>
              {messages.map((msg) => {
                return <div className="text-15px text-red-500">{msg}</div>;
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
          <button onClick={sendMessage}>Send</button>
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
