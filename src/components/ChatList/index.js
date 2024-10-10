"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatList({ chatlist, ProfileUser }) {
  const router = useRouter();

  useEffect(() => {
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
      setUserOffline();
    };
  }, [ProfileUser?._id]);

  return (
    <>
      <div className="flex flex-col item-center justify-between lg:-24">
        <div className="">
          <div className="text-3xl font-semibold py-5 lg:p-5">
            Chat Your Matched Buddies
          </div>
          <hr></hr>

          <div className="lg:mt-10 flex flex-col lg:px-10 ">
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
                              backgroundImage: `url(${d.profilePicture})`,
                            }}
                          />
                          <div className="flex flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal line-clamp-1">
                              {d.fullName}
                            </p>
                            <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">
                              {d.CurrentEducation}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                            {d.online ? "online" : "offline"}
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
