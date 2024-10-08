"use client";
import { useRouter } from "next/navigation";

export default function HomePage({ ProfileUser, user }) {
  const router = useRouter();
  return (
    <>
      <div className="lg:px-40 flex flex-1 justify-center   w-full">
        <div className="layout-content-container flex flex-col lg:max-w-[960px] flex-1">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/stability/f285ade4-cbef-442c-a14d-6f980571a960.png")',
                }}
              >
                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Study with friends, anytime
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Get matched with a friendly study partner in any subject. No
                    scheduling required!
                  </h2>
                </div>
                <div className="flex-wrap gap-3 flex">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#47a6e6] text-[#111517] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span
                      className="truncate"
                      onClick={() => {
                        router.push("/buddy");
                      }}
                    >
                      {ProfileUser?._id ? "Find Buddy" : "Try Now"}
                    </span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0f3f4] text-[#111517] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span
                      className="truncate"
                      onClick={() => {
                        {
                          ProfileUser?._id
                            ? router.push("/notes")
                            : router.push("/sign-in");
                        }
                      }}
                    >
                      {" "}
                      {ProfileUser?._id ? "Explore Notes" : "Sign In"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-[#111517] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            How it works
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/f864ebc1-f486-4c59-925c-808e8dc4d956.png")',
                }}
              />
              <div>
                <p className="text-[#111517] text-base font-medium leading-normal">
                  Get matched instantly
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  Just click 'start' and we'll match you with someone right
                  away.
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  Illustration, 2 students studying together
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/f285ade4-cbef-442c-a14d-6f980571a960.png")',
                }}
              />
              <div>
                <p className="text-[#111517] text-base font-medium leading-normal">
                  No scheduling required
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  We're here 24/7 so you can study whenever you want.
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  Illustration, 2 students studying together
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/c087b6b3-cea1-4d5e-9cde-1f2b03674e6c.png")',
                }}
              />
              <div>
                <p className="text-[#111517] text-base font-medium leading-normal">
                  Study with a friend
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  Our AI matches you with someone who's studying the same topic.
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  Illustration, 2 students studying together
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/c084d4a3-218c-474d-b6d0-cf4d84e700c2.png")',
                }}
              />
              <div>
                <p className="text-[#111517] text-base font-medium leading-normal">
                  Always available
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  We're always available to help you understand your homework.
                </p>
                <p className="text-[#647987] text-sm font-normal leading-normal">
                  Illustration, 2 students studying together
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-[#111517] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Subject categories
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/65b2fbc6-400c-4526-ac1b-d23cf33bdc8e.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Math
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/c9093038-0bb5-45c4-b386-ef81b78a83d2.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Science
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/128b5770-6227-40ba-94d3-35aa8b90c877.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                English
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/faaa4764-b107-43d4-b280-93c0f5b597fa.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Social Studies
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/374c87db-2bc9-4a6f-bc51-4f0cc2f666bf.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Writing
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/05181f0c-0d6f-427f-a2f1-99286dacc667.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Foreign Language
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/15b6c923-1fa8-4e01-9664-5b541a093703.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Computer Science
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/591f2c7b-e9ab-44f0-a506-b5692c8783ac.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Study Skills
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/0422f6a1-255e-492a-b84c-e7da80cd7709.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                Test Prep
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/sdxl10/ff987cec-ce40-485a-9c55-565bef59f7cb.png")',
                }}
              />
              <p className="text-[#111517] text-base font-medium leading-normal">
                College Admissions
              </p>
            </div>
          </div>
          <div className="flex px-4 py-3 justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#47a6e6] text-[#111517] text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Get started</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
