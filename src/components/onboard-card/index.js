"use client";
import { studenInitialData, studentFormFields } from "@/utils";
import CommonForm from "../Common-form";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Supabase client initialization inside a useEffect or conditionally on client-side
let supabaseClient;
if (typeof window !== "undefined") {
  supabaseClient = createClient(
    "https://yzlxgraclfixtcrahgup.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bHhncmFjbGZpeHRjcmFoZ3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTEzMjIsImV4cCI6MjA0Mjc2NzMyMn0.ILXAWBAG42TltAzzHZQtTN_yF4P79-XfhJn4ORg8src"
  );
}
export default function OnBoardCard({ user, email }) {
  const [currentOnboardData, setOnboardData] = useState(studenInitialData);
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
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
      setOnboardData({
        ...currentOnboardData,
        profilePicture: url,
      });
    }
  }
  const getImageUrl = async (bucketName, filePath) => {
    // Get the public URL for the image
    const { data } = await supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const router = useRouter();

  useEffect(() => {
    if (file !== null) handleFileUploadToSupabase();
  }, [file]);

  async function handleOnboard() {
    const data = {
      ...currentOnboardData,
      userId: user,
      email: email,
      MatchedStudent: [],
    };

    fetch("/api/createprofile", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("success");

        router.refresh();
      })
      .catch((er) => {
        console.log(er);
      });
  }
  console.log(currentOnboardData);

  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="text-3xl p-5 font-semibold">Find A Study Buddy</div>
        <hr></hr>
      </div>
      <CommonForm
        formData={studentFormFields}
        currentData={currentOnboardData}
        setData={setOnboardData}
        buttonText={"Create Profile"}
        buttonAction={handleOnboard}
        handleFileChange={handleFileChange}
      />
      <ToastContainer />
    </>
  );
}
