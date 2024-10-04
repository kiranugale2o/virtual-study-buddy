// "use client";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// let socket;

// export default function SocketClient() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Initialize socket connection on the client side
//     socket = io();

//     // Listen for messages from the server
//     socket.on("message", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     socket.on('activeUsers', (users) => {
//             setActiveUsers(users);
//         });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       // Emit a message to the server
//       socket.emit("message", message);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   return (
//     <div className="flex flex-col item-center justify-between lg:p-20">
//       <div className="text-2xl  font-semibold p-5">Chat Your Buddies</div>
//       <hr />
//       <h2>Socket.IO Chat</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>{msg}</p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// components/Chat.js
"use client";
import React, { useEffect, useState } from "react";

import { ChevronsLeftRightEllipsisIcon } from "lucide-react";
import Pusher from "pusher-js";

const ChatPage = ({ user, ProfileUser, buddyId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize socket connection on the client side
    // socket = io();

    const pusher = new Pusher("4eaa06251960e1a80490", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      console.log(data.message);

      setMessages(data.message);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      fetch("/api/sendMessage", {
        method: "POST",
        body: JSON.stringify({
          message,
          senderId: ProfileUser?._id,
          receiverId: buddyId,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) =>
        res.json().then((res) => {
          alert(res.message);
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat {buddyId}</h2>
      <div>
        {messages && messages.length > 0
          ? messages.map((msg, index) => (
              <div key={index}>
                <div className="">{msg.userName}</div>
                {msg.text}
              </div>
            ))
          : null}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <h1>{buddyId}</h1>
    </div>
  );
};

export default ChatPage;
