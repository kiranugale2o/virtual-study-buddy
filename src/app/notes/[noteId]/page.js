import { currentUser, fetchUser, GetAllNotes, GetSingleNote } from "@/actions";

import { redirect } from "next/navigation";
export default async function NotesViewMore({ params }) {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }
  //   const { noteid } = params;
  //   const notes = await GetSingleNote(noteid);
  return <NotesViewMore notes={notes} />;
}
