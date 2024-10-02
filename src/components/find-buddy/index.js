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
        className="relative  flex size-full min-h-screen flex-col   group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className=" text-4xl font-black leading-tight tracking-[-0.033em]">
                    Find a study buddy
                  </p>
                  <p className="text-[#60778a]  text-base font-bold leading-normal">
                    this are your study preferences and we'll find you a buddy.
                  </p>
                </div>
                <Link href="/buddy/mybuddy">
                  <Button className="bg-sky-200 mt-5 text-black hover:text-black hover:bg-white font-semibold">
                    My Buddy{" "}
                  </Button>
                </Link>
              </div>
              <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                You want to study
              </h2>
              <div className="flex gap-3 flex-wrap p-3  pr-4">
                {ProfileUser?.studyTime.map((d) => {
                  return (
                    <>
                      {d.split(",").map((time) => {
                        return (
                          <>
                            <div className="flex flex-wrap">
                              <div className="flex  text-black h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f5] pl-4 pr-4">
                                <p className=" text-sm font-medium leading-normal">
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
              <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
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
                              <div className="flex bg-[#f0f2f5] h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl text-black pl-4 pr-4">
                                <p className=" text-sm font-medium leading-normal ">
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
              <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Match study buddies
              </h2>
              <div className="flex lg:gap-5 p-2 lg:p-3 flex-wrap gap-2 lg:pr-4">
                {buddys.map((d) => {
                  return (
                    <>
                      {d.userId === ProfileUser?.userId ? null : (
                        <>
                          <div className="flex items-center gap-2  bg-gray-100 rounded-sm  border px-4 min-h-[72px] py-2">
                            <div
                              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                              style={{
                                backgroundImage: `url(${d.profilePicture})`,
                              }}
                            />
                            <Link href={`/user/${d._id}`}>
                              <div className="flex flex-col lg:w-[250px] justify-center ">
                                <p className=" text-black  font-medium leading-normal line-clamp-1">
                                  {d.fullName}
                                </p>
                                <p className="text-[#60778a]  text-sm  font-normal leading-normal line-clamp-2">
                                  {d.subjectsOfInterest[0]
                                    .split(",")
                                    .map((subject) => {
                                      return (
                                        <>
                                          {subject}
                                          {" , "}
                                        </>
                                      );
                                    })}
                                </p>
                              </div>
                            </Link>
                            <Button
                              className=" bg-sky-400 "
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
        <div className="fopter">
          <h1>goooo</h1>
        </div>
      </div>
    </>
  );
}
