"use client";
import { initialJobData } from "@/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export default function CommonForm({
  formData,
  currentData,
  setData,
  buttonText,
  buttonAction,
  handleFileChange,
}) {
  return (
    <>
      <div className="flex flex-col w-full justify-between item-center ">
        <div className="w-full p-5 lg:p-10">
          <form action={buttonAction} className="grid gap-5 grid-row-4 w-full">
            {formData.map((d) => {
              return (
                <>
                  {d.contentType === "file" ? (
                    <div className="overscroll-y-contain">
                      <Label className="input-group-text" htmlFor="picture">
                        Profile Picture
                      </Label>
                      <Input
                        id="picture"
                        key={d.label}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111517] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#647987] p-4 text-base font-normal leading-normal "
                        type={d.contentType}
                        disabled={d.disabled}
                        name={d.name}
                        onChange={(e) => handleFileChange(e)}
                        placeholder={d.placeholder}
                      />
                    </div>
                  ) : (
                    <>
                      <Label
                        className="flex flex-col min-w-40 flex-1"
                        htmlFor="picture"
                      >
                        <p class="text-[#111517] text-base font-medium leading-normal pb-2">
                          {d.label}
                        </p>
                        <Input
                          required
                          key={d.label}
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111517] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-14 placeholder:text-[#647987] p-4 text-base font-normal leading-normal  "
                          type={d.contentType}
                          disabled={d.disabled}
                          value={currentData?.[d.name] || ""}
                          name={d.name}
                          onChange={(e) => {
                            setData({
                              ...currentData,
                              [d.name]: e.target.value,
                            });
                          }}
                          placeholder={d.placeholder}
                        ></Input>
                      </Label>
                    </>
                  )}
                </>
              );
            })}
            <button
              type="submit"
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-sky-300 text-[#111517] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span class="truncate">Create Profile</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
