import {
  currentUser,
  fetchOneBuddy,
  fetchUser,
  getMatchedStudents,
} from "@/actions";
import ChatBox from "@/components/ChatBox";
import { redirect } from "next/navigation";

const ChatsID = async ({ params }) => {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const { chatId } = params;

  const chatuser = await fetchOneBuddy(chatId);
  console.log(chatuser, chatId);

  return <ChatBox chat={chatuser} ProfileUser={ProfileUser} />;
};

export default ChatsID;
