"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Butcherman } from "next/font/google";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyBuddyCard({ matchedBuddy, ProfileUser }) {
  console.log(matchedBuddy);
  const router = useRouter();
  useEffect(() => {
    router.refresh("/buddy/mybuddy");
  }, []);

  function RemoveBuddy(id) {
    const data = {
      userId: ProfileUser?._id,
      buddyId: id,
    };

    fetch("/api/removematchedbuddy", {
      method: "DELETE",
      body: JSON.stringify({ data }),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          alert(res.message);
          router.refresh("/notes/mybuddy");
        } else {
          alert(res.message);
        }
      })
    );
  }
  return (
    <>
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
            <p className=" tracking-light text-[32px] font-bold leading-tight">
              My Buddies
            </p>
            <p className="text-[#637588] text-sm font-normal leading-normal">
              View your current study buddies, and manage your buddy settings
            </p>
          </div>
        </div>
        <hr />

        <h1 className="text-2xl font-semibold  lg:px-5 py-5 ">
          Your Matched Buddies
        </h1>
        <div className="flex gap-3 p-2 lg:p-3 flex-wrap lg:pr-4">
          {matchedBuddy && matchedBuddy.length > 0
            ? matchedBuddy.map((data) => {
                return (
                  <>
                    <div className="mt-5 border text-black bg-gray-100  hover:text-blackhover:shadow-lg rounded-lg shadow-sm block lg:flex gap-6 lg:gap-0 items-center gap-4 justify-between w-[350px] lg:w-[500px]   px-4 min-h-[72px] py-2 ">
                      <div className=" flex items-center gap-4 ">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                          style={{
                            backgroundImage: `url(${data.profilePicture})`,
                          }}
                        />
                        <div className="flex flex-col justify-center lg:w-[180px] whitespace-pre-wrap">
                          <p className=" text-base font-medium leading-normal line-clamp-1">
                            {data.fullName}
                          </p>
                          <p className=" text-sm font-normal leading-normal line-clamp-2">
                            {data.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4 mr-2 mx-auto  lg:ml-0 lg:mt-0">
                        <Link href={`/user/${data._id}`}>
                          <Button className="bg-sky-300">View</Button>
                        </Link>
                        <Button
                          className="bg-red-500"
                          onClick={() => {
                            RemoveBuddy(data._id);
                          }}
                        >
                          Remove Buddy
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
