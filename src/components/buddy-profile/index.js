"use client";
export default function BuddyProfileCard({ ProfileUser, SearchBuddy }) {
  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5 ">
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
                  <p className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    {SearchBuddy?.fullName}
                  </p>
                  <p className="text-[#636e88] text-base font-normal leading-normal">
                    {SearchBuddy?.email}
                  </p>
                  <p className="text-[#636e88] text-base font-normal leading-normal">
                    {SearchBuddy?.CurrentEducation}
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111318] text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto">
                  <span className="truncate">Send message</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3b72e8] text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 @[480px]:flex-auto">
                  <span className="truncate">Schedule session</span>
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Proficient in
          </h2>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            {SearchBuddy?.subjectsOfInterest[0].split(",").map((d, i) => {
              return (
                <div
                  key={i}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-sky-100 pl-4 pr-4"
                >
                  <p className="text-[#111318] text-sm font-medium leading-normal">
                    {d}
                  </p>
                </div>
              );
            })}
          </div>
          <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Availability
          </h2>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            {SearchBuddy?.studyTime[0].split(",").map((d, i) => {
              return (
                <div
                  key={i}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-sky-100 pl-4 pr-4"
                >
                  <p className="text-[#111318] text-sm font-medium leading-normal">
                    {d}
                  </p>
                </div>
              );
            })}
          </div>
          <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Bio
          </h2>
          <p className="text-[#111318] text-[18px] font-normal leading-normal pb-3 pt-1 px-4">
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

          <h2 className="text-[#111318] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Past sessions
          </h2>
          <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/e15584d0-3b66-4e02-b66a-f1240f2c50d5.png")',
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-[#111318] text-base font-medium leading-normal line-clamp-1">
                Product design feedback
              </p>
              <p className="text-[#636e88] text-sm font-normal leading-normal line-clamp-2">
                Fri, 1:00 PM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/c02a9966-7e56-4dee-934c-62fad2cfe6de.png")',
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-[#111318] text-base font-medium leading-normal line-clamp-1">
                Portfolio review
              </p>
              <p className="text-[#636e88] text-sm font-normal leading-normal line-clamp-2">
                Mon, 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
