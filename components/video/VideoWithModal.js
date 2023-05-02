import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import VideoPlayer from "components/video/VideoPlayer";
import VideoEmbedded from "components/video/VideoEmbedded";

export default function VideoBlock({ locale, record }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex w-full items-center gap-6 bg-gray-light p-3 px-6 lg:p-7"
      >
        <div className="relative h-9 w-9 rounded-full bg-blue md:h-12 md:w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="centered-absolute h-6 w-6 text-white md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="font-serif text-xxs md:text-base">
          {record.titleVideo}
        </div>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          onClose={setOpen}
          className="fixed inset-0 z-50 overflow-y-auto"
          as="div"
        >
          <div className="flex min-h-screen items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={`${
                  open ? "fixed inset-0 bg-black opacity-80 duration-200" : ""
                }`}
              />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-700"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block h-[260px] w-[95vw] transform pt-5 transition-all md:h-[430px] md:w-[720px]">
                <div className="absolute -top-6 right-0">
                  <button
                    type="button"
                    className="rounded-md text-gray-dark-400 hover:text-gray-dark-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <div className="h-full">
                  {record.externalVideo?.url && (
                    <VideoEmbedded
                      record={record}
                      video={record.externalVideo}
                    />
                  )}
                  {record.internalVideo?.url && <VideoPlayer record={record} />}{" "}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
