"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function FindBuddy({ user, ProfileUser, buddys }) {
  const ar = [1, 2, 2, 2, 2, 2, 2, 3, 2];

  function handleMatchButton(id) {
    const data = {
      userId: ProfileUser?._id,
      matchUser: id,
    };
    fetch("/api/addmatchbuddy", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      })
    );
  }
  return (
    <>
      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-[#111518] text-4xl font-black leading-tight tracking-[-0.033em]">
                    Find a study buddy
                  </p>
                  <p className="text-[#60778a] text-base font-normal leading-normal">
                    this are your study preferences and we'll find you a buddy.
                  </p>
                </div>
                <Link href="/buddy/mybuddy">
                  <Button className="bg-sky-400 mt-5">My Buddy </Button>
                </Link>
              </div>
              <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                You want to study
              </h2>
              <div className="flex gap-3 p-3 flex-wrap pr-4">
                {ProfileUser?.studyTime.map((d) => {
                  return (
                    <>
                      {d.split(",").map((time) => {
                        return (
                          <>
                            <div className="flex flex-wrap">
                              <div className="flex bg-sky-100 h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f5] pl-4 pr-4">
                                <p className="text-[#111518] text-sm font-medium leading-normal">
                                  {time}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </div>
              <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                You are interested in
              </h2>
              <div className="flex flex-wrap ">
                {ProfileUser?.subjectsOfInterest.map((d) => {
                  return (
                    <>
                      {d.split(",").map((subject) => {
                        return (
                          <>
                            <div className="flex gap-3 p-3 flex-wrap pr-4">
                              <div className="flex bg-sky-100 h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f5] pl-4 pr-4">
                                <p className="text-[#111518] text-sm font-medium leading-normal ">
                                  {subject}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </div>
              <hr />
              <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Match study buddies
              </h2>
              <div className="flex flex-wrap">
                {buddys.map((d) => {
                  return (
                    <>
                      {d.userId === ProfileUser?.userId ? null : (
                        <>
                          <div className="flex items-center gap-2 bg-white lg:px-4 min-h-[72px] py-2">
                            <div
                              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                              style={{
                                backgroundImage: `url(${d.profilePicture})`,
                              }}
                            />

                            <div className="flex flex-col justify-center ">
                              <p className="text-[#111518] text-base font-medium leading-normal line-clamp-1">
                                {d.fullName}
                              </p>
                              <p className="text-[#60778a] text-sm font-normal leading-normal line-clamp-2">
                                Computer Science · 3 years experience
                              </p>
                            </div>

                            <Button
                              className="ml-10 bg-sky-400"
                              onClick={() => {
                                handleMatchButton(d._id);
                              }}
                            >
                              Match
                            </Button>
                          </div>
                        </>
                      )}{" "}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
