"use client";
import { pusherClient } from "@/helpers/pusher";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LucideSend } from "lucide-react";
import { formatDateforLastSeen } from "@/utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        setChat((...prevMsg) => [res.messages]);
        setMessages("");
      })
    );
  };

  useEffect(() => {
    getChatDetails();
    pusherClient.subscribe("chat");

    pusherClient.bind(`${ConversationId}`, (data) => {
      // setMessages((prevMessages) => [...prevMessages, data]);
      setMessages((...prevMsg) => [data]);
      console.log(messages, "mssssss");
    });

    return () => {
      pusherClient.unsubscribe("chat");
      pusherClient.unbind(`message${ConversationId}`);
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
          getChatDetails();
        } else {
          toast.error("Somthing wrong ! Refresh your page");
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
                        {"  "}
                        <sub className="">{msg.time}</sub>
                      </span>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <div className="text-2xl">Start Chat</div>
          )}
          {messages && messages.length > 0 ? (
            <>
              {messages.map((d) => {
                return (
                  <div
                    className={`message ${
                      d.senderId === ProfileUser?._id
                        ? "user-message"
                        : "bot-message"
                    }`}
                  >
                    {d.text}
                    {"ff"}
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
            <div className="border rounded-full mt-2 ml-3">
              <LucideSend onClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
