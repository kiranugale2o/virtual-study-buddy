import { currentUser, fetchUser } from "@/actions";
import OnBoardCard from "@/components/onboard-card";
import { redirect } from "next/navigation";

export default async function OnBoard() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && ProfileUser?._id) {
    redirect("/");
  }
  return (
    <div className="lg:p-20">
      <OnBoardCard user={user?.userId} email={user?.email} />
    </div>
  );
}
