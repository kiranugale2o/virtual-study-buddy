import {
  currentUser,
  fetchOneBuddy,
  fetchUser,
  getConversationId,
  getMatchedStudents,
} from "@/actions";
import ChatBox from "@/components/ChatBox";
import ChatList from "@/components/ChatList";
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

  const ConversationId = await getConversationId(ProfileUser?._id, chatId);
  const data = await getMatchedStudents(ProfileUser?._id);
  return (
    <div className="main-container">
      <div className="w-2/3 max-lg:hidden border">
        {" "}
        <ChatList chatlist={data} ProfileUser={ProfileUser} />
      </div>
      <div className="w-full lg:w-2/3 border">
        <ChatBox
          chat={chatuser}
          ProfileUser={ProfileUser}
          ConversationId={ConversationId?._id}
        />
      </div>
    </div>
  );
};

export default ChatsID;
