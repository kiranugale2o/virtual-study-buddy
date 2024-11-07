"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ImageUp, LucideSend } from "lucide-react";
import { formatDateforLastSeen } from "@/utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Realtime } from "ably";
import { Label } from "../ui/label";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

//Supabase client initialization inside a useEffect or conditionally on client-side
let supabaseClient;
if (typeof window !== "undefined") {
  supabaseClient = createClient(
    "https://yzlxgraclfixtcrahgup.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bHhncmFjbGZpeHRjcmFoZ3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTEzMjIsImV4cCI6MjA0Mjc2NzMyMn0.ILXAWBAG42TltAzzHZQtTN_yF4P79-XfhJn4ORg8src"
  );
}

export default function ChatBox({ chat, ProfileUser, ConversationId }) {
  const data = {
    senderId: ProfileUser?._id,
    text: "",
    photo: "",
    chatId: chat?._id,
    time: formatDateforLastSeen(),
  };
  const [currentMsgData, setCurrentMsg] = useState(data);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChat] = useState([]);
  const [converSationId, setCoversationId] = useState("");
  const [file, setFile] = useState(null);
  const [dialogBtn, setDialogbtn] = useState(false);

  //image upload
  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
    toast.success("wait a Second !");
  }
  async function handleFileUploadToSupabase() {
    if (!supabaseClient || !file) return;

    const { data, error } = await supabaseClient.storage
      .from("studybuddy")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      // Get the public URL for the image

      const url = await getImageUrl("studybuddy", data.path);
      setCurrentMsg({ ...currentMsgData, photo: url, chatId: chat?._id });
      setDialogbtn(true);
    }
  }
  const getImageUrl = async (bucketName, filePath) => {
    // Get the public URL for the image
    const { data } = await supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  useEffect(() => {
    if (file !== null) handleFileUploadToSupabase();
  }, [file]);

  //close all image upload part

  const getChatDetails = async () => {
    await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        chatId: ConversationId,
      }),
    }).then((res) =>
      res.json().then((res) => {
        setChat((...prevMsg) => [res.messages]);
        setMessages("");
      })
    );
  };

  useEffect(() => {
    if (chat?._id && ProfileUser?._id && ConversationId) getChatDetails();
  }, [ConversationId]);

  // Initialize Ably

  const ably = new Realtime(
    "dNFTmg.aD98sA:NV14WYDsQMiMWYaxH5LYqLA9MXX_hXl4JtQl7D3lNME"
  ); // Replace with your Ably API key
  const channel = ably.channels.get("chat");

  useEffect(() => {
    // Subscribe to messages
    channel.subscribe(`message${ConversationId}`, (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg.data]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [ConversationId]);

  function sendMessage() {
    setCurrentMsg({ ...currentMsgData, senderId: ProfileUser?._id });
    if (currentMsgData.text !== "" || currentMsgData.photo !== "") {
      fetch("/api/sendMessage", {
        method: "POST",
        body: JSON.stringify(currentMsgData),
      }).then((res) =>
        res.json().then((res) => {
          if (res.success) {
            channel.publish(`message${ConversationId}`, currentMsgData);
            setCurrentMsg({ ...currentMsgData, text: "", photo: "" });
            setDialogbtn(false);
          } else {
            toast.error("Somthing wrong ! Refresh your page");
          }
        })
      );
    }
  }
  return (
    <div>
      <Dialog open={dialogBtn} onOpenChange={setDialogbtn}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-sky-500">
              Send Image
            </DialogTitle>
          </DialogHeader>
          <div className="w-[200px]">
            {currentMsgData.photo !== "" ? (
              <img src={currentMsgData.photo} alt="sending image" />
            ) : null}
          </div>
          <DialogFooter className="gap-5 flex flex-row mx-auto lg:mx-0 lg:gap-0">
            <DialogClose asChild>
              <Button
                className="bg-sky-500 hover:bg-sky-400"
                onClick={sendMessage}
              >
                Send
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col justify-between w-full">
        <div className="fixed z-[1000] lg:relative lg:z-[0] flex items-center gap-4 bg-[#111418] w-full  px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
              style={{
                backgroundImage: `url(${chat?.profilePicture})`,
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-medium leading-normal line-clamp-1">
                {chat?.fullName}
              </p>
              <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">
                {chat?.online ? "online" : "offline"}
              </p>
            </div>
          </div>
          <div className="shrink-0"></div>
        </div>

        <div className="flex flex-col gap-1 p-10 overflow-auto py-20 lg:py-auto h-[600px] lg:h-[450px]">
          {chats && chats.length > 0 ? (
            <>
              {chats[0].map((msg) => {
                return (
                  <>
                    <div
                      className={`message ${
                        msg.senderId === ProfileUser?._id
                          ? "user-message"
                          : "bot-message"
                      }`}
                    >
                      <div className="lg:w-[250px]">
                        {msg.photo !== "" ? (
                          <div>
                            <img src={msg.photo} alt="image"></img>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <span>
                        {msg.text}
                        {"  "}
                        <sub className="">{msg.time}</sub>
                      </span>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <div className="text-2xl">Start Chat</div>
          )}
          {messages && messages.length > 0 ? (
            <>
              {messages.map((d) => {
                return (
                  <div
                    className={`message ${
                      d.senderId === ProfileUser?._id
                        ? "user-message"
                        : "bot-message"
                    }`}
                  >
                    <div className="lg:w-[250px]">
                      {d.photo !== "" ? (
                        <div>
                          <img src={d.photo} alt="image"></img>
                          <sub>{d.time}</sub>
                        </div>
                      ) : null}
                    </div>
                    <span>
                      {d.text}
                      {"  "}
                      <sub className="">{d.time}</sub>
                    </span>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>

      <div>
        <div>
          <form
            action={sendMessage}
            className=" flex absolute   p-2 border w-full bg-sky-100 justify-between lg:w-[560px] mx-0 ml-0"
          >
            <input
              className=" w-full border p-2"
              type="text"
              value={currentMsgData.text}
              onChange={(e) => {
                setCurrentMsg({ ...currentMsgData, text: e.target.value });
              }}
            />

            <Label htmlFor="img" className="mt-2 ml-1">
              <ImageUp />
            </Label>
            <input
              type="file"
              id="img"
              onChange={(e) => handleFileChange(e)}
              className="w-[60px] hidden"
            ></input>
            <div className="lg:flex justify-between mx-auto ">
              <div className="border rounded-full mt-2 ml-3">
                <LucideSend
                  type="submit"
                  onClick={sendMessage}
                  className="hover:bg-black hover:text-white border rounded-lg"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
