"use client";
import { ArrowRightCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage({ ProfileUser, myNotes }) {
  return (
    <>
      <div className="flex w-full flex-col item-center justify-between gap-5 p-5  lg:p-20 ">
        <Button className=" bg-sky-400 absolute right-16 top-40 lg:top-20 text-[15px]">
          Edit Profile
        </Button>
        <div className="lg:px-24 block lg:flex gap-5 border shadow-md p-5 lg:p-10 ">
          <div className="">
            <div
              className="bg-center  bg-no-repeat aspect-auto bg-cover rounded-full min-h-32 w-32"
              style={{
                backgroundImage: `url(${ProfileUser?.profilePicture})`,
              }}
            />
          </div>

          <div className="flex flex-col p-5 gap-3">
            <p className=" text-[24px]  font-bold leading-tight tracking-[-0.015em]">
              {ProfileUser?.fullName}
            </p>
            <p className="text-[#636e88]  text-base font-normal leading-normal">
              {ProfileUser?.email}
            </p>
            <p className="text-[#636e88]  text-base font-normal leading-normal">
              {ProfileUser?.CurrentEducation}
            </p>
          </div>
          <div className=" flex flex-wrap ">
            <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 lg:pb-3 pt-5">
              Proficient in
            </h2>
            <div className="flex gap-3 lg:px-0 px-6 ml-5 py-5 flex-wrap lg:pr-4">
              {ProfileUser?.subjectsOfInterest[0].split(",").map((d, i) => {
                return (
                  <div
                    key={i}
                    className="flex  h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-gray-100 text-black pl-4 pr-4"
                  >
                    <p className="px-5 text-sm font-medium leading-normal">
                      {d}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap">
            <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-5 pb-3 pt-5">
              Availability
            </h2>
            <div className="flex gap-3 py-2 px-5 flex-wrap  pr-4">
              {ProfileUser?.studyTime[0].split(",").map((d, i) => {
                return (
                  <div
                    key={i}
                    className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-gray-100 text-black pl-4 pr-4"
                  >
                    <p className=" text-sm font-medium leading-normal">{d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className=" flex flex-col gap-5 shadow-md p-5 lg:p-10">
          <div className="text-3xl font-semibold">Your Notes</div>
          <div className="flex flex-wrap   gap-4  lg:px-6">
            {myNotes && myNotes.length > 0 ? (
              <>
                {myNotes.map((d, i) => (
                  <>
                    {i < 3 ? (
                      <>
                        <Card
                          key={i}
                          className="w-[300px] lg:w-[280px] bg-gray-50 p-0  "
                        >
                          <CardHeader className="lg:p-2">
                            <CardTitle>
                              <div className="flex">
                                <div
                                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                                  style={{
                                    backgroundImage: `url(${d.senderId.profilePicture})`,
                                  }}
                                />
                                <div className="flex flex-col px-2 py-1 gap-1">
                                  <div className="text-[20px] font-normal text-base">
                                    {d.senderId.fullName}
                                  </div>
                                  <div className="text-[15px] text-slate-400 font-normal">
                                    {d.postingTime}
                                  </div>
                                </div>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col py-2">
                              <div className="text-[24px]">{d.title}</div>

                              <div className="text-[16px] h-[50px] leading-normal line-clamp-2 text-slate-400">
                                {d.content}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : null}
                  </>
                ))}
              </>
            ) : (
              <div className="text-2xl  mx-auto p-10 lg:p-24">
                Empty Notes !
              </div>
            )}

            <ArrowRightCircle className="mt-20 size-10  rounded-full hover:text-red-500" />
          </div>
        </div>
      </div>
    </>
  );
}
