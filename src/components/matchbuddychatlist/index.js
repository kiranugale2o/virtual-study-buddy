import Link from "next/link";

export default function ChatList({ buddy }) {
  return (
    <>
      <div className="flex flex-col">
        {buddy && buddy.length > 0
          ? buddy.map((d) => {
              return (
                <Link href={`/chat/${d._id}`}>
                  <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                        style={{
                          backgroundImage:
                            'url("https://cdn.usegalileo.ai/stability/40c6b67f-935a-4b92-b2c2-3ff1877696df.png")',
                        }}
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-white text-base font-medium leading-normal line-clamp-1">
                          {d.fullName}
                        </p>
                        <p className="text-white text-sm font-normal leading-normal line-clamp-2">
                          {d.email}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <p className="text-white text-sm font-normal leading-normal">
                        2h
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </>
  );
}
