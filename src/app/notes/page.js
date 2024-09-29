import { currentUser, fetchUser } from "@/actions";
import NotesComponent from "@/components/Notes";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }
  return <NotesComponent />;
}
