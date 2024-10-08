"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Userbutton from "../userButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export default function Navbar({ user, ProfileInfo }) {
  const router = useRouter();
  const pathname = usePathname();
  const navItem = [
    {
      name: "Home",
      path: "/",
      show: true,
    },
    {
      name: "find Buddys",
      path: "/buddy",
      show: ProfileInfo,
    },
    {
      name: "Notes",
      path: "/notes",
      show: ProfileInfo,
    },
    {
      name: "Chat",
      path: "/chat",
      show: ProfileInfo,
    },
    {
      name: "ask me",
      path: "/chatbot",
      show: ProfileInfo,
    },
    {
      name: "Profile",
      path: "/profile",
      show: ProfileInfo,
    },
  ];

  return (
    <>
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-5 lg:px-10 py-3  shadow   h-auto ">
        <div class="flex items-center p-2 lg:p-0 justify-between gap-2 text-[#111418]">
          <div class="size-6 lg:size-8">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-sky-400"
            >
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 class="text-[#111418] text-sky-400 text-2xl lg:text-3xl font-bold leading-tight tracking-[-0.015em] ">
            Study Buddy
          </h2>

          <Sheet>
            <SheetTrigger
              className={`flex mt-0  ml-20 border rounded-lg bg-sky-100 lg:hidden ${
                user ? "block" : "hidden"
              }`}
            >
              <MenuIcon className="font-2xl size-9 p-1  " />
            </SheetTrigger>

            <SheetContent>
              <SheetTitle
                className="uppercase text-2xl semibold text-sky-400 "
                onClick={() => {
                  router.push("/");
                }}
              >
                StudyBuddy
              </SheetTitle>
              <div className=" flex flex-col lg:hidden justify-start mt-6 gap-5   ">
                {navItem.map((d) => {
                  return (
                    <div key={d.name}>
                      {d.show ? (
                        <SheetClose asChild>
                          <Link
                            href={d.path}
                            className="font-semibold uppercase flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] hover:bg-sky-300 bg-sky-100 text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] "
                          >
                            {d.name}
                          </Link>
                        </SheetClose>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div
                className="hidden lg:flexmt-6 ml-10"
                style={{ display: `${user ? "block" : "none"}` }}
              >
                <Userbutton user={user} ProfileUser={ProfileInfo} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex  lg:flex">
          <div className=" hidden lg:flex flex-row  grid gap-10 grid-cols-3 mr-5">
            {navItem.map((d) => {
              return (
                <>
                  {d.show ? (
                    <Link
                      href={d.path}
                      className=" font-semibold uppercase flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] hover:bg-sky-300 bg-sky-100 text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                      {d.name}
                    </Link>
                  ) : null}
                </>
              );
            })}
          </div>
          <button
            className={`${
              user ? "hidden" : "flex"
            } flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-black  text-white text-sm font-bold leading-normal tracking-[0.015em]`}
          >
            <Link href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>
              <span class="">
                {pathname === "/sign-up" ? "Log In" : "Create Account"}
              </span>
            </Link>
          </button>
          <div
            // style={{ display: `${user ? "block" : "none"}` }}
            className="hidden lg:block"
          >
            <Userbutton user={user} ProfileUser={ProfileInfo} />
          </div>
        </div>
      </header>
    </>
  );
}
