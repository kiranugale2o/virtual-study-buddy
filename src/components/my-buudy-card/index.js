"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Butcherman } from "next/font/google";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyBuddyCard({ matchedBuddy }) {
  console.log(matchedBuddy);
  const router = useRouter();
  useEffect(() => {
    router.refresh("/buddy/mybuddy");
  }, []);
  return (
    <>
      <Tabs className="" defaultValue="activated">
        <Button
          className="mt-10 ml-8"
          onClick={() => {
            router.push("/buddy");
          }}
        >
          BACK
        </Button>
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
                        <div className="mt-5 border hover:bg-sky-300 hover:shadow-4xl rounded-lg shadow-sm flex items-center gap-4 justify-between  w-[500px]  bg-white px-4 min-h-[72px] py-2 ">
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
