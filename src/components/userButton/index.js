"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { fetchUser } from "@/actions";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Userbutton({ user, ProfileUser }) {
  const router = useRouter();
  function handleSignOut() {
    Cookies.remove("jobportal_token");
    router.refresh("/");
  }
  return (
    <>
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col">
              <div className="flex gap-4 grid-col-gap-5 ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="block ">
                  {/* <h1 className="text-[15px] font-semibold">
                  {ProfileUser?.role === "candidate"
                    ? ProfileUser?.candidate?.name
                    : ProfileUser?.recruiter?.name}
                </h1> */}
                  <h1 className="text-[15px]">{user?.email}</h1>
                </div>
              </div>
              <Button
                className="w-full mt-5"
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>

              <Button
                className={` w-full mt-5`}
                style={{ display: `${ProfileUser ? "flex" : "none"}` }}
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Edit Profile
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
