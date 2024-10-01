import { createClient } from "@supabase/supabase-js";

export const studentFormFields = [
  {
    label: "Full Name",
    name: "fullName",
    placeholder: "Enter your full Name ",
    contentType: "input",
  },
  {
    label: "college",
    name: "college",
    placeholder: "Enter your college  Name ",
    contentType: "input",
  },
  {
    label: "Current Education",
    name: "CurrentEducation",
    placeholder: "Enter your Current Education ",
    contentType: "input",
  },
  {
    label: " What are you studying ?",
    name: "subjectsOfInterest",
    placeholder: "E.g. java,python,physics,math",
    contentType: "textarea",
  },
  {
    label: "Study Methods",
    name: "preferredStudyMethods",
    placeholder: "E.g. video call ,chat ,In-person",
    contentType: "input",
  },
  {
    label: "Study Time",
    name: "studyTime",
    placeholder: "E.g. afternoon,evening,morning",
    contentType: "input",
  },
  {
    label: "location",
    name: "location",
    placeholder: "Enter your location",
    contentType: "input",
  },
  {
    label: "Profile Picture",
    name: "ProfilePicture",
    placeholder: "Enter your location",
    contentType: "file",
  },
];

export const studenInitialData = {
  fullName: "",
  email: "",
  college: "",
  CurrentEducation: "",
  subjectsOfInterest: [],
  preferredStudyMethods: [],
  studyTime: [],
  location: "",
  profilePicture: "",
};

// Supabase client initialization inside a useEffect or conditionally on client-side
export let supabaseClient;
if (typeof window !== "undefined") {
  supabaseClient = createClient(
    "https://yzlxgraclfixtcrahgup.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bHhncmFjbGZpeHRjcmFoZ3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTEzMjIsImV4cCI6MjA0Mjc2NzMyMn0.ILXAWBAG42TltAzzHZQtTN_yF4P79-XfhJn4ORg8src"
  );
}

// firebaseConfig.js (Example Firebase configuration file)

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9X4hY1a1W9jOI0LedOvOs8L07bhSVGqg",
  authDomain: "studybuddy-5a2fe.firebaseapp.com",
  projectId: "studybuddy-5a2fe",
  storageBucket: "studybuddy-5a2fe.appspot.com",
  messagingSenderId: "481736869337",
  appId: "1:481736869337:web:6fc2c02f44dea61e1245c8",
  measurementId: "G-R8J22FTCV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

//Notes Initial Data
export const initialNotesData = {
  title: "",
  content: "",
  img: "",
  video: "",
};

//date format
export const formatTime = () => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const currentDate = new Date().toLocaleDateString("en-GB", options);

  return currentDate;
};

//console.log(formatTime()); // Output example: "Today 5:30 PM"
