import {
  currentUser,
  fetchUser,
  GetAllNotes,
  GetFavouritesNotes,
  GetMyPostedNotes,
} from "@/actions";
import NotesComponent from "@/components/Notes";
import { redirect } from "next/navigation";

export default async function NotesPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const Notes = await GetAllNotes(ProfileUser?._id);
  const myNotes = await GetMyPostedNotes(ProfileUser?._id);
  const favouriteNotes = await GetFavouritesNotes(ProfileUser?._id);
  return (
    <div className="py-20 lg:py-0">
      <NotesComponent
        ProfileUser={ProfileUser}
        Notes={Notes}
        myNotes={myNotes}
        favouriteNotes={favouriteNotes}
      />
    </div>
  );
}
