"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatbotCard() {
  const [messages, setMessages] = useState([
    { sender: "user", text: "hi" },
    { sender: "bot", text: "hello" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [botMessage, setBotmessage] = useState({ sender: "bot", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.trim() === "") return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    fetch("/api/studybuddychatbot", {
      method: "POST",
      body: JSON.stringify({ prompt: userInput }),
    }).then((res) =>
      res.json().then((res) => {
        toast.success("wait !");
        const botMessages = { sender: "bot", text: res.message };
        setMessages((prevMessages) => [...prevMessages, botMessages]);
      })
    );

    // Clear the input field
    setUserInput("");
  };

  return (
    <div className="w-full p-0  bg-white lg:p-20   mx-0">
      <h1 className="text-3xl bg-white lg:mt-5 font-semibold ">
        Chatbot For Candidate
      </h1>
      <hr />
      <div className="h-[500px] lg:h-[400px] overflow-y-auto bg-white flex flex-col gap-2 p-10 lg:p-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="block w-full lg:flex  lg:w-3/3 mx-auto fixed bottom-1 bg-white"
      >
        <div className="flex w-full  mx-auto">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="  border-current lg:w-2/3 lg:p-5 "
          ></Input>
          <Button type="submit" className="border rounded ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-square-arrow-up"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m16 12-4-4-4 4" />
              <path d="M12 16V8" />
            </svg>
          </Button>
        </div>
        {/* <Button className="fixed bottom-10 lg:bottom-1 lg:right-5">
         
        </Button> */}
      </form>

      <ToastContainer />
    </div>
  );
}
