"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPasswordCard() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access sessionStorage here
      const value = sessionStorage.getItem("email");
      setEmail(value);
    }
  });
  function handleResetPassword() {
    if (password === confirmPassword) {
      const data = {
        email,
        password,
      };
      fetch("/api/sign-in/setNewPassword", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) =>
        res.json().then((res) => {
          if (res.success) {
            toast.success(res.message);
            router.push("/sign-in");
          } else {
            toast.error(res.message);
          }
        })
      );
    } else {
      toast.error("Confirm Password Does not Match !");
    }
  }
  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle className="text-[20px]">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleResetPassword}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">New Password</Label>
              <Input
                id="name"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                placeholder="Enter new Password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="conform">Confirm Password</Label>
              <Input
                id="conform"
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
                required
                placeholder="Enter Confirm Password"
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-7">
            <Button className="w-full" type="submit">
              SET PASSWORD
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}
