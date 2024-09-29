"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
//import { useSearchParams } from "next/navigation";

let socket;

export default function ChatCard({ user, ProfileUser, buddyId }) {
  //  let messages = [44];
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    text: "text",
    imageUrl: "img",
    videoUrl: "video",
  });

  const [nmessage, setnMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [receiverId, setReceiverId] = useState("");
  const searchParams = useSearchParams();
  let fullName = searchParams.get("name");
  let id = searchParams.get("id");
  // useEffect(() => {
  //   // Connect to the Socket.IO server
  //   socket = io();
  //   //console.log(id);
  //   // alert(id);

  //   socket.emit("message-page", id);

  //   socket.emit("seen", id);

  //   socket.on("message", (data) => {
  //     console.log("message data", data);
  //     setMessages(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [id]);

  const getMessage = () => {
    // socket.on("usersmessage", (msg) => {
    //   // console.log(msg);
    //   //console.log(JSON.parse(msg));
    //   messages.push(msg);
    //   console.log("msg", messages);
    //   // setMessages((prevMessages) => [...prevMessages, msg]);
    //   // Spread msg directly, assuming it contains the actual message and not an object
    // });
    // socket.emit("mymessage", { sender: ProfileUser?._id, receiver: id });
    // socket.on("mymessage", (msg) => {
    //   // console.log(msg);
    //   //console.log(JSON.parse(msg));
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    //   console.log("nymsg", msg);
    //   console.log(messages);
    //   // setMessages((prevMessages) => [...prevMessages, msg]);
    //   // Spread msg directly, assuming it contains the actual message and not an object
    // });
  };
  const sendMessage = () => {
    // Assuming msg contains a text field
    alert(buddyId);
    // socket.emit("message", {
    //   sender: ProfileUser?._id,
    //   receiver: id,
    //   text: message.text,
    //   imageUrl: message.imageUrl,
    //   videoUrl: message.videoUrl,
    //   msgByUserId: ProfileUser?._id,
    // });

    setMessage({
      text: "",
      imageUrl: "",
      videoUrl: "",
    });
  };

  return (
    <>
      <div className="flex w-full ">
        <div className="flex flex-col w-[700px]">
          <h2>Socket.IO Chat{id}</h2>
          {messages && messages.length > 0
            ? messages.map((msg, index) => {
                return <p>{msg.text}</p>;
              })
            : null}
        </div>
        <input
          type="text"
          className="border"
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
          value={message.text}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </>
  );
}
