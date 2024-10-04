"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function SocketClient() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize socket connection on the client side
    socket = io("https://virtual-study-buddy-black.vercel.app/");

    // Listen for messages from the server
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit a message to the server
      socket.emit("message", message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="flex flex-col item-center justify-between lg:p-20">
      <div className="text-2xl  font-semibold p-5">Chat Your Buddies</div>
      <hr />
      <h2>Socket.IO Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
