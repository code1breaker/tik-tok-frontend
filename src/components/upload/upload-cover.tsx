import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SelectCover from "./select-cover";
import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import { setUploadForm } from "@/src/lib/store/upload-slice";

export default function UploadCover() {
  const [poster, setPoster] = useState("");
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.upload.form);
  const coverImg = form?.details?.coverImgUrl;

  const handleConfirm = () => {
    dispatch(setUploadForm({ details: { coverImgUrl: poster } }));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={`px-0 ${coverImg ? "h-60 " : ""}`}
          >
            {coverImg ? (
              <div className="w-full h-full">
                <img src={coverImg} className="w-full h-full object-cover" />
              </div>
            ) : (
              "Cover"
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl! gap-0">
          <DialogHeader className="mb-4">
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar overflow-y-auto">
            <SelectCover poster={poster} setPoster={setPoster} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
