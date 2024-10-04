"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;
export default function ChatList({ buddy }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket = io(); // Replace with your server URL

    // Listen for active users
    socket.on("activeUsers", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUsernameSubmit = (id) => {
    // Emit the registerUser event to the server
    const username = id;
    socket.emit("registerUser", username);
    setUsername(""); // Clear the input field
  };

  return (
    <>
      <div className="flex flex-col item-center justify-between lg:p-10">
        <div className="text-3xl  font-semibold p-5">Chat Your Buddies</div>
        <hr />
        <div className="flex flex-col">
          {buddy && buddy.length > 0
            ? buddy.map((d) => {
                return (
                  // <Link href={`/chat/${d._id}`}>
                  <div>
                    <div
                      onClick={() => {
                        handleUsernameSubmit(d?._id);
                      }}
                      className=" border flex items-center gap-4 bg-[#111418] px-4 mx-auto  min-h-[72px] py-2 justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                          style={{
                            backgroundImage: `url(${d.profilePicture})`,
                          }}
                        />
                        <div className="flex flex-col justify-center">
                          <p className="text-white text-base font-medium leading-normal line-clamp-1">
                            {d.fullName}
                          </p>
                          <p className="text-white text-sm font-normal leading-normal line-clamp-2">
                            {d.email}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <p className="text-white text-sm font-normal leading-normal">
                          2h
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div>
        <h2>Chat</h2>

        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleUsernameSubmit}>Join Chat</button>
        </div>

        <div>
          <h3>Active Users</h3>
          <ul>
            {activeUsers.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
