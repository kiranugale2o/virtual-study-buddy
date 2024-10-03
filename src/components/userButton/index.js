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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function Userbutton({ user, ProfileUser }) {
  const router = useRouter();
  function handleSignOut() {
    Cookies.remove("study-buddy_token");
    router.refresh("/");
  }
  return (
    <>
      <div className="block">
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={ProfileUser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col">
              <div className="flex gap-4 grid-col-gap-5 ">
                <Avatar>
                  <AvatarImage src={ProfileUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="block ">
                  <h1 className="text-[15px]">{ProfileUser?.fullName}</h1>
                  <h1 className="text-[15px]">{user?.email}</h1>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-5">Sign Out</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-sky-500">
                      StudyBuddy
                    </DialogTitle>
                    <div className="text-[18px]">
                      You Want To SignOut From StudyBuddy !
                    </div>
                  </DialogHeader>

                  <DialogFooter className="gap-5 flex flex-row mx-auto lg:mx-0 lg:gap-0">
                    <DialogClose asChild>
                      <Button type="submit">Back</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          handleSignOut();
                        }}
                        className="bg-red-500 hover:bg-red-400"
                      >
                        SignOut
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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
