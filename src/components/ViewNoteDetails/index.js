export default function ViewNoteDetails({ notes }) {
  return (
    <>
      <div className="flex w-full flex-col item-center justify-between lg:p-20">
        <div className="text-3xl font-semibold p-3 ">Notes In Details</div>
        <hr />
        <div className="flex flex-col justify-between p-5">
          <div className="flex">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
              style={{
                backgroundImage: `url(${notes.senderId.profilePicture})`,
              }}
            />
            <div className="flex flex-col px-2 py-1 gap-1">
              <div className="text-[20px] font-normal text-base">
                {notes.senderId.fullName}
              </div>
              <div className="text-[15px] text-slate-400 font-normal ">
                {notes.postingTime}
              </div>
            </div>
          </div>
          <br />
          <div className="flex flex-col border w-full  rounded-lg shadow-md p-4 bg-white text-black">
            {notes.img !== "" ? (
              <div className="w-full lg:h-[460px] p-5 mx-auto">
                <img
                  className="w-full lg:h-[400px]"
                  src={notes.img}
                  alt="content image"
                />
              </div>
            ) : null}
            <div className="font-serif  whitespace-pre-wrap lg:whitespace-pre text-[20px]">
              {notes.content}
            </div>
            {notes.video !== "" ? (
              <div className="w-full lg:h-[460px] p-5 mx-auto">
                <video className="lg:h-[400px] lg:w-full" controls>
                  <source src={notes.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
