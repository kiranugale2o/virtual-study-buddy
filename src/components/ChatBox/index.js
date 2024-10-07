"use client";
import { pusherClient } from "@/helpers/pusher";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LucideSend } from "lucide-react";
import { formatDateforLastSeen } from "@/utils";

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
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    pusherClient.bind(`message${ConversationId}`, handleMessage);

    return () => {
      pusherClient.unsubscribe("chat");
      pusherClient.unbind(`message${ConversationId}`, handleMessage);
    };
  }, [message]);
  function sendMessage() {
    const data = {
      senderId: ProfileUser?._id,
      text: message,
      photo: "",
      chatId: chat?._id,
      time: formatDateforLastSeen(),
    };
    fetch("/api/sendMessage", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          setMessage("");
        } else {
          alert("not send");
        }
      })
    );
  }
  return (
    <div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center gap-4 bg-[#111418] w-full  px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
              style={{
                backgroundImage: `url(${chat?.profilePicture})`,
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-medium leading-normal line-clamp-1">
                {chat?.fullName}
              </p>
              <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">
                {chat?.online ? "online" : "offline"}
              </p>
            </div>
          </div>
          <div className="shrink-0"></div>
        </div>

        <div className="flex flex-col gap-1 p-10 overflow-auto h-[400px] lg:h-[400px]">
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
                      <span>
                        {msg.text}
                        <sub>{msg.time}</sub>
                      </span>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}
          {messages && messages.length > 0 ? (
            <>
              {messages.map((msg) => {
                return (
                  <div
                    className={`message ${
                      msg.senderId === ProfileUser?._id
                        ? "user-message"
                        : "bot-message"
                    }`}
                  >
                    {msg}
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>

      <div>
        <div className=" flex fixed bottom-5 p-2 border w-full bg-sky-100 justify-between lg:w-[560px] mx-0 ml-0">
          <input
            className=" w-full border p-2"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <br />

          <div className="lg:flex justify-between mx-auto ">
            <div className="border rounded-full">
              <LucideSend onClick={sendMessage} />
            </div>

            {/* <Button onClick={getChatDetails}>get Live Chat</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
