import { currentUser, fetchUser, GetAllNotes, GetSingleNote } from "@/actions";
import ViewNoteDetails from "@/components/ViewNoteDetails";

import { redirect } from "next/navigation";
export default async function NotesViewMore({ params }) {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }
  const { notesId } = params;
  const notes = await GetSingleNote(notesId);

  return (
    <>
      <ViewNoteDetails notes={notes} />
    </>
  );
}
