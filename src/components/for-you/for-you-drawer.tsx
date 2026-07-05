import { ForYouDrawerPropsIf } from "@/src/types/components/for-you/for-you-drawer.types";
import Comment from "../common/comment";
import { IoClose } from "react-icons/io5";

export default function ForYouDrawer({
  videoId,
  openDrawer,
  onClose,
}: ForYouDrawerPropsIf) {
  return (
    <div
      className={`${openDrawer ? "w-[40rem] p-4 pb-0" : "w-0"} transition-[width] duration-500 ease-in-out h-screen overflow-hidden bg-black border-l flex flex-col relative`}
    >
      {openDrawer && (
        <>
          <p>Comments</p>
          <IoClose
            className="absolute top-4 right-4 rounded-full text-3xl p-0.5 cursor-pointer"
            onClick={onClose}
          />

          <Comment videoId={videoId} />
        </>
      )}
    </div>
  );
}
