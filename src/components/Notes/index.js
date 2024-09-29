"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NotebookPen,
  Star,
  UserCircle2Icon,
  Trash2,
  ImageUpIcon,
  VideoIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function NotesComponent() {
  const ar = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  const [dialogbtn, setDialogbtn] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  console.log(imgUrl);

  return (
    <>
      <Tabs defaultValue="account">
        <div className="flex flex-col w-full item-center p-5 ">
          <div className="flex w-full px-10 py-5 justify-between  ">
            <h1 className="text-3xl font-semibold">Notes</h1>
            <Button
              variant="secondary"
              onClick={() => {
                setDialogbtn(true);
              }}
            >
              Post Notes
            </Button>
            <Dialog
              className="text-black "
              open={dialogbtn}
              onOpenChange={setDialogbtn}
            >
              <DialogContent className="text-black overflow-auto ">
                <DialogHeader>
                  {/* <DialogTitle className="text-2xl ">Post A Notes</DialogTitle> */}
                  <DialogTitle>
                    <div className="flex">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                        style={{
                          backgroundImage: `url("https://yzlxgraclfixtcrahgup.supabase.co/storage/v1/object/public/studybuddy/public/real-girl-pic-photo-images54.webp")`,
                        }}
                      />
                      <div className="flex flex-col px-2 py-1 gap-1">
                        <div className="text-[20px] font-normal text-base">
                          Shradha ugale
                        </div>
                        <div className="text-[15px] text-slate-400 font-normal ">
                          Today 5.30 PM{" "}
                        </div>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className=" flex justify-between">
                  {imgUrl !== "" ? (
                    <img
                      className="h-[100px] w-[200px]"
                      src="https://yzlxgraclfixtcrahgup.supabase.co/storage/v1/object/public/studybuddy/public/real-girl-pic-photo-images54.webp"
                    />
                  ) : null}

                  {videoUrl !== "" ? (
                    <video className="h-[100px] w-[200px]" controls>
                      <source src="your-video-file.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>
                <div className="flex flex-col ">
                  <Textarea className="h-[200px]" />
                  <div className="flex justify-end gap-4 p-2 mr-5">
                    <Label htmlFor="img">
                      <ImageUpIcon className="size-[30px] " />
                    </Label>
                    <Input
                      className="hidden"
                      onChange={(e) => setImgUrl(e.target.files[0].name)}
                      type="file"
                      id="img"
                    ></Input>

                    <label for="videoInput">
                      <VideoIcon className="size-[30px] " />
                    </label>
                    <Input
                      className="hidden"
                      type="file"
                      id="videoInput"
                      accept="video/*"
                    />
                  </div>
                  <Button className="bg-black text-white w-full ">POST</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <hr className="" />
          <div className="flex justify-start lg:px-5 py-5">
            <TabsList className="bg-black ">
              <TabsTrigger value="account" className="text-sky-400">
                <NotebookPen />
                Notes
              </TabsTrigger>
              <TabsTrigger value="password" className="text-sky-400">
                <Star />
                favourites
              </TabsTrigger>
              <TabsTrigger value="mynote" className="text-sky-400">
                <UserCircle2Icon />
                My Notes
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="account"
            className="flex flex-wrap gap-4 lg:px-6 "
          >
            {ar.map((d, i) => {
              return (
                <Card
                  key={i}
                  className="w-[350px] lg:w-[380px] p-0 bg-black text-white"
                >
                  <CardHeader className="lg:p-2">
                    <CardTitle>
                      <div className="flex">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                          style={{
                            backgroundImage: `url("https://yzlxgraclfixtcrahgup.supabase.co/storage/v1/object/public/studybuddy/public/real-girl-pic-photo-images54.webp")`,
                          }}
                        />
                        <div className="flex flex-col px-2 py-1 gap-1">
                          <div className="text-[20px] font-normal text-base">
                            Shradha ugale
                          </div>
                          <div className="text-[15px] text-slate-400 font-normal ">
                            Today 5.30 PM{" "}
                          </div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col py-2">
                      <div className="text-[24px] ">Title</div>
                      <div className="text-[16px] h-[50px]  leading-normal line-clamp-2 text-slate-400 ">
                        this is my first notes but i not preperd for this so i
                        will ijkrjjfrj this is my first notes but i not preperd
                        for this so i will ijkrjjfrj this is my first notes but
                        i not preperd for this so i will ijkrjjfrj
                      </div>
                    </div>

                    <div className="flex  justify-between ">
                      <div className="flex gap-4 py-2">
                        <Trash2 />
                        <Star />
                      </div>
                      <Button variant="secondary">View More</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </>
  );
}
