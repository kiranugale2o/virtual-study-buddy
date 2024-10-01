"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NotebookPen,
  Star,
  UserCircle2Icon,
  Trash2,
  ImageUpIcon,
  VideoIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { formatTime, initialNotesData, supabaseClient } from "@/utils";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from "../ui/progress";

// Main functional component for displaying notes
export default function NotesComponent({
  ProfileUser,
  Notes,
  myNotes,
  favouriteNotes,
}) {
  // State variables for managing dialog and file uploads
  const [dialogbtn, setDialogbtn] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState(null);
  const [videoFile, setVideofile] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoProgressDialog, setVideoProgressDialog] = useState(false);
  const [currentNoteData, setCurrentNoteData] = useState(initialNotesData);
  const router = useRouter();

  // Effect to handle image file upload
  useEffect(() => {
    if (file) handleFileUploadToSupabase();
  }, [file]);

  // Effect to handle video file upload
  useEffect(() => {
    if (videoFile) handleVideoFileUploadToSupabase();
  }, [videoFile]);

  // Function to handle image file selection
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  // Function to handle video file selection
  function handleVideoChange(event) {
    setVideofile(event.target.files[0]);
  }

  // Function to upload image to Supabase
  async function handleFileUploadToSupabase() {
    if (!supabaseClient || !file) return;

    const { data, error } = await supabaseClient.storage
      .from("notes")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      const url = await getUrl("notes", data.path);
      setImgUrl(url);
      setCurrentNoteData((prevData) => ({ ...prevData, img: url }));
    }
  }

  // Function to upload video file to Firebase and get URL
  async function handleVideoFileUploadToSupabase() {
    const storageRef = ref(storage, `videos/${videoFile.name}`);
    setVideoProgressDialog(true);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoProgress(progress);
      },
      (error) => {
        console.error("Error uploading video:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoUrl(downloadURL);
          setCurrentNoteData((prevData) => ({
            ...prevData,
            video: downloadURL,
          }));
        });

        if (videoProgress === 100) {
          setVideoProgressDialog(false);
        }
      }
    );
  }

  // Helper function to get the public URL of uploaded files
  const getUrl = async (bucketName, filePath) => {
    const { data } = await supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Function to handle note posting
  function handleNote() {
    const data = {
      ...currentNoteData,
      senderId: ProfileUser?._id,
      postingTime: formatTime(),
    };

    fetch("/api/postNotes", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setDialogbtn(false); // Close dialog on successful post
          router.refresh("/notes");
        }
        alert(res.message); // Show success/error message
      });
  }

  // Function to add a note to favorites
  function addFavouritesNotes(notes_id) {
    const data = {
      userId: ProfileUser?._id,
      notesId: notes_id,
    };
    fetch("/api/addFavouritesNotes", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message); // Show success/error message
      });
  }

  //Function to delete User Create Notes
  function deleteMyNotes(id) {
    fetch("/api/deletemynotes", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          alert(res.message);
          router.refresh("/notes");
        } else {
          alert(res.message);
        }
      })
    );
  }

  //Function to Remove Notes from Favourites
  function removeFavourites(id) {
    //
  }
  return (
    <>
      <Tabs defaultValue="allnotes">
        <div className="flex flex-col w-full item-center p-5">
          <div className="flex w-full px-10 py-5 justify-between">
            <h1 className="text-3xl font-semibold">Notes</h1>
            <Button variant="secondary" onClick={() => setDialogbtn(true)}>
              Post Notes
            </Button>

            {/* Dialog for posting notes */}
            <Dialog open={dialogbtn} onOpenChange={setDialogbtn}>
              <DialogContent className="text-black overflow-auto">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                        style={{
                          backgroundImage: `url(${ProfileUser?.profilePicture})`,
                        }}
                      />
                      <div className="flex flex-col px-2 py-1 gap-1">
                        <div className="text-[20px] font-normal text-base">
                          {ProfileUser?.fullName}
                        </div>
                        <div className="text-[15px] text-slate-400 font-normal">
                          {formatTime()}
                        </div>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-between">
                  {imgUrl && (
                    <img className="h-[100px] w-[200px]" src={imgUrl} />
                  )}
                  {videoUrl && (
                    <video className="h-[100px] w-[200px]" controls>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="flex flex-col">
                  <form onSubmit={handleNote} className="flex flex-col gap-4">
                    <Input
                      value={currentNoteData.title}
                      placeholder="Enter Title Of Note"
                      onChange={(e) => {
                        setCurrentNoteData((prevData) => ({
                          ...prevData,
                          title: e.target.value,
                        }));
                      }}
                    />
                    <Textarea
                      className="h-[200px]"
                      value={currentNoteData.content}
                      placeholder="Enter Note........."
                      onChange={(e) => {
                        setCurrentNoteData((prevData) => ({
                          ...prevData,
                          content: e.target.value,
                        }));
                      }}
                    />
                    <div className="flex justify-end gap-4 p-2 mr-5">
                      <Label htmlFor="img">
                        <ImageUpIcon className="size-[30px]" />
                      </Label>
                      <Input
                        className="hidden"
                        onChange={handleFileChange}
                        type="file"
                        id="img"
                      />
                      <label htmlFor="videoInput">
                        <VideoIcon className="size-[30px]" />
                      </label>
                      <Input
                        className="hidden"
                        onChange={handleVideoChange}
                        type="file"
                        id="videoInput"
                        accept="video/*"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-black text-white w-full"
                    >
                      POST
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Progress dialog for video upload */}
          <Dialog className="text-black w-[200px]" open={videoProgressDialog}>
            <DialogContent className="text-black">
              <h1 className="text-[20px]">Uploading Video.....</h1>
              <Progress value={videoProgress} />
              <Button
                disabled={videoProgress === 100}
                onClick={() => setVideoProgressDialog(false)}
                className="bg-black text-white w-[80px] mr-2"
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>

          <hr />
          <div className="flex justify-start lg:px-5 py-5">
            <TabsList className="bg-black">
              <TabsTrigger value="allnotes" className="text-sky-400">
                <NotebookPen />
                Notes
              </TabsTrigger>
              <TabsTrigger value="likeNotes" className="text-sky-400">
                <Star />
                Favourites
              </TabsTrigger>
              <TabsTrigger value="mynote" className="text-sky-400">
                <UserCircle2Icon />
                My Notes
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content for all notes */}
          <TabsContent value="allnotes" className="flex flex-col gap-5">
            <div className="text-3xl font-semibold">Explore All Notes</div>
            <div className="flex flex-wrap gap-4 lg:px-6">
              {Notes.map((d, i) => (
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
                    <div className="flex justify-between">
                      <div className="flex gap-4 py-2">
                        <Star
                          className="text-red-500"
                          onClick={() => addFavouritesNotes(d._id)}
                        />
                      </div>
                      <Button
                        onClick={() => router.push(`/notes/${d._id}`)}
                        variant="secondary"
                      >
                        View More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content for favorite notes */}
          <TabsContent value="likeNotes" className="flex flex-col gap-5">
            <div className="text-3xl font-semibold">My Favourites Notes</div>
            <div className="flex flex-wrap gap-4 lg:px-6">
              {favouriteNotes && favouriteNotes.length > 0 ? (
                favouriteNotes.map((d, i) => (
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
                      <div className="flex justify-between">
                        <div className="flex gap-4 py-2">
                          <Trash2
                            className="text-red-600"
                            onClick={() => {
                              removeFavourites(d._id);
                            }}
                          />
                        </div>
                        <Button
                          onClick={() => router.push(`/notes/${d._id}`)}
                          variant="secondary"
                        >
                          View More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-2xl mx-auto p-10 lg:p-24">
                  Not Add Any Favourite Notes!
                </div>
              )}
            </div>
          </TabsContent>

          {/* Content for my posted notes */}
          <TabsContent value="mynote" className="flex flex-col gap-5">
            <div className="text-3xl font-semibold">My Posted Notes</div>
            <div className="flex flex-wrap gap-4 lg:px-6">
              {myNotes && myNotes.length > 0 ? (
                <>
                  {myNotes.map((d, i) => (
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
                        <div className="flex justify-between">
                          <div className="flex gap-3">
                            <Button
                              variant="destructive"
                              onClick={() => {
                                deleteMyNotes(d._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                          <Button
                            onClick={() => router.push(`/notes/${d._id}`)}
                            variant="secondary"
                          >
                            View More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <div className="text-2xl  mx-auto p-10 lg:p-24">
                  Empty Notes !
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
