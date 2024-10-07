"use client";

import { pusherClient } from "@/helpers/pusher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatList({ chatlist, ProfileUser }) {
  const router = useRouter();
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    // const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    //   cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    // });

    // Set user online when they connect
    const setUserOnline = async () => {
      await fetch("/api/setUserStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: ProfileUser?._id, status: "online" }),
      });
    };

    setUserOnline();

    // Cleanup function to set user offline when they disconnect
    const setUserOffline = async () => {
      await fetch("/api/setUserStatus", {
        method: "POST",
        body: JSON.stringify({ userId: ProfileUser?._id, status: "offline" }),
      }).then((res) =>
        res.json().then((res) => {
          console.log(res.success);
        })
      );
    };

    // Set the user offline on page unload
    window.onbeforeunload = setUserOffline;

    return () => {
      //setUserOffline();
      pusherClient.disconnect(); // Clean up Pusher connection
    };
  }, [ProfileUser?._id]);

  //   useEffect(() => {
  //     const fetchOnlineUsers = async () => {
  //       const response = await fetch("/api/getOnlineUser");
  //       const data = await response.json();
  //       setOnlineUsers(data.onlineUsers);
  //     };

  //     fetchOnlineUsers();
  //   }, []);

  return (
    <>
      <div className="flex flex-col item-center justify-between lg:-24">
        <div className="">
          <div className="text-3xl font-semibold p-5">Chat Buddies</div>
          <hr></hr>
          <div className="gap-1 px-6 flex flex-1 justify-start py-5">
            <div className="layout-content-container flex flex-col w-80">
              <div className="px-4 py-3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    <div
                      className="text-[#9dabb8] flex border-none bg-[#293038] items-center justify-center pl-4 rounded-l-xl border-r-0"
                      data-icon="MagnifyingGlass"
                      data-size="24px"
                      data-weight="regular"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                      </svg>
                    </div>
                    <input
                      placeholder="Search"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-full placeholder:text-[#9dabb8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                      defaultValue=""
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-10 ">
            {chatlist && chatlist.length > 0 ? (
              <>
                {chatlist.map((d) => {
                  return (
                    <Link href={`/chat/${d._id}`}>
                      <div className="flex items-center gap-4 bg-[#111418] w-full  px-4 min-h-[72px] py-2 justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                            style={{
                              backgroundImage:
                                'url("https://cdn.usegalileo.ai/stability/40c6b67f-935a-4b92-b2c2-3ff1877696df.png")',
                            }}
                          />
                          <div className="flex flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal line-clamp-1">
                              {d.fullName}
                            </p>
                            <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">
                              Product Design at Google
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                            {d.online ? "Active" : d.lastSeen}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col p-24">
        <div className="text-2xl">Online User</div>
        {/* <div>{
            onlineUsers.map((d)=>{
                return <
            })
            }</div> 
        {chatlist && chatlist.length > 0 ? (
          <>
            {chatlist.map((d) => {
              return (
                <Link href={`/chat/${d._id}`}>
                  <div className="flex text-1xl border bg-red-600">
                    {d.fullName}
                    {d.online ? "online" : "offline"}
                  </div>
                </Link>
              );
            })}
          </>
        ) : null}
      </div> */}
    </>
  );
}
