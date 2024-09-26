"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Butcherman } from "next/font/google";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyBuddyCard({ matchedBuddy }) {
  console.log(matchedBuddy);
  const router = useRouter();
  useEffect(() => {
    router.refresh("/buddy/mybuddy");
  }, []);
  return (
    <>
      <Tabs className="" defaultValue="activated">
        <div
          className="mt-10 ml-8  p-1  w-[40px] rounded-sm hover:bg-sky-100 hover:shadow-md "
          onClick={() => {
            router.push("/buddy");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
        </div>
        <div className="layout-content-container block lg:flex lg:flex-col lg:px-20 lg:py-10">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
                My Buddies
              </p>
              <p className="text-[#637588] text-sm font-normal leading-normal">
                View your current study buddies, and manage your buddy settings
              </p>
            </div>

            <TabsList className="block lg:flexgap-2 mx-auto bg-sky-100">
              <TabsTrigger value="activated">Activated</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="deactivated">Deactivated</TabsTrigger>
            </TabsList>
          </div>
          <hr />
          <TabsContent value="activated">
            <h1 className="text-2xl font-semibold lg:py-5 mx-auto">
              Activated Buddies
            </h1>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {matchedBuddy && matchedBuddy.length > 0
                ? matchedBuddy.map((data) => {
                    return (
                      <>
                        <Link href={`/user/${data._id}`}>
                          <div className="mt-5 border hover:bg-sky-100 hover:shadow-4xl rounded-lg shadow-sm flex items-center gap-4 justify-between  w-[500px]  bg-white px-4 min-h-[72px] py-2 ">
                            <div className=" flex items-center gap-4">
                              <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                                style={{
                                  backgroundImage: `url(${data.profilePicture})`,
                                }}
                              />
                              <div className="flex flex-col justify-center">
                                <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                                  {data.fullName}
                                </p>
                                <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
                                  {data.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })
                : null}
            </div>
          </TabsContent>
          <TabsContent value="pending">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="deactivated">
            {" "}
            dd Make changes to your account here.
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
