"use client";
export default function BuddyProfileCard({ ProfileUser, SearchBuddy }) {
  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5  ">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex p-4 @container">
            <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
              <div className="flex gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                  style={{
                    backgroundImage: `url(${SearchBuddy?.profilePicture})`,
                  }}
                />
                <div className="flex flex-col justify-center">
                  <p className=" text-[22px] text-sky-200 font-bold leading-tight tracking-[-0.015em]">
                    {SearchBuddy?.fullName}
                  </p>
                  <p className="text-[#636e88] text-sky-100 text-base font-normal leading-normal">
                    {SearchBuddy?.email}
                  </p>
                  <p className="text-[#636e88] text-sky-100 text-base font-normal leading-normal">
                    {SearchBuddy?.CurrentEducation}
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-sky-400 hover:bg-white hover:text-black text-black text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto">
                  <span className="truncate">Send message</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-sky-400 text-white hover:bg-white hover:text-black text-black text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto">
                  <span className="truncate">Video Call</span>
                </button>
              </div>
            </div>
          </div>
          <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Proficient in
          </h2>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            {SearchBuddy?.subjectsOfInterest[0].split(",").map((d, i) => {
              return (
                <div
                  key={i}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-gray-100 text-black pl-4 pr-4"
                >
                  <p className=" text-sm font-medium leading-normal">{d}</p>
                </div>
              );
            })}
          </div>
          <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Availability
          </h2>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            {SearchBuddy?.studyTime[0].split(",").map((d, i) => {
              return (
                <div
                  key={i}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-gray-100 text-black pl-4 pr-4"
                >
                  <p className=" text-sm font-medium leading-normal">{d}</p>
                </div>
              );
            })}
          </div>
          <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Bio
          </h2>
          <p className=" text-[18px] font-normal leading-normal  pb-3 pt-1 px-4">
            {SearchBuddy?.fullName} is a {SearchBuddy?.CurrentEducation} student
            at {SearchBuddy?.college}, with a strong interest in programming
            languages like{" "}
            {SearchBuddy?.subjectsOfInterest[0].split(",").map((d) => {
              return (
                <>
                  {d}
                  {" , "}
                </>
              );
            })}
            . He prefers to study in the{" "}
            {SearchBuddy?.studyTime[0].split(",").map((d) => {
              return (
                <>
                  {d}
                  {" , "}
                </>
              );
            })}
            through{" "}
            {SearchBuddy?.preferredStudyMethods[0].split(",").map((d) => {
              return (
                <>
                  {d}
                  {" , "}
                </>
              );
            })}{" "}
            study methods. {SearchBuddy?.fullName} is currently based in{" "}
            {SearchBuddy?.location}.
          </p>

          <div className="flex flex-col justify-center">
            <p className=" text-base font-medium leading-normal line-clamp-1">
              Portfolio review
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
