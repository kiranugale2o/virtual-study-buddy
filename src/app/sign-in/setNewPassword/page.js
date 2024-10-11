import { currentUser } from "@/actions";
import ResetPasswordCard from "@/components/Reset-password-card";
import VerifyOtpCard from "@/components/verify-otp-card";
import { redirect } from "next/navigation";

export default async function ResetPasswords() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="mt-20 lg:mt-0 lg:p-24">
        <ResetPasswordCard />
      </div>
    </>
  );
}
