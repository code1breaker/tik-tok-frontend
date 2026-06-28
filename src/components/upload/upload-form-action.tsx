import { MESSAGES } from "@/src/constants/messages";
import convertUrlToFile from "@/src/helpers/upload/convertUrlToFile";
import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import { resetUpload } from "@/src/lib/store/upload-slice";
import * as uploadApi from "@/src/services/upload/upload.client";
import * as postApi from "@/src/services/post/post.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function UploadFormAction() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.upload.form);
  const file = useAppSelector((state) => state.upload.file);
  const uploadedFile = useAppSelector((state) => state.upload.uploadedFile);
  const uploadStatus = useAppSelector((state) => state.upload.uploadStats);
  const { progress } = uploadStatus || {};
  const isVideoUploaded = progress != 100;

  const isPostNow = form.settings.postTiming === "now";
  const {
    postId,
    details: { description, coverImgUrl },
    settings: { interaction, visibility },
  } = form;

  const handlePostNow = async () => {
    if (!file || !uploadedFile) return;
    try {
      const coverImgfile = await convertUrlToFile({
        url: coverImgUrl,
        filename: file?.name,
      });

      const res = await uploadApi.uploadSignature({
        filetype: "image",
        foldername: "cover/thumbnail",
      });

      const { url, folder, signature, apiKey, timestamp } = res.data?.data;
      const body = {
        file: coverImgfile,
        folder,
        signature,
        api_key: apiKey,
        timestamp,
      };

      const resp = await uploadApi.uploadToCloudinary({ url, body });

      const uploadBody = {
        caption: description,
        thumbnail: resp?.data?.url,
        visibility: visibility,
        status: "published",
        // hashtags,
        // interaction,
      };

      const response = await postApi.updatePost({
        body: uploadBody,
        postId,
      });

      toast.success("Video uploaded successfully");
      router.push("/profile");
      dispatch(resetUpload());
    } catch (error: any) {
      console.log("Post Now Error: ", error);
      toast.error(
        MESSAGES[error?.data?.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
    }
  };

  const handlePostSchedule = async () => {
    console.log(form, "FORM SCHEDULE");
  };

  const handleDiscard = async () => {
    if (!uploadedFile) return;

    try {
      const body = {
        publicId: uploadedFile.public_id,
        resourceType: "video",
      };

      dispatch(resetUpload());
      const res = await uploadApi.deleteVideo(body);

      toast.error("Discard post successfully");
    } catch (error: any) {
      console.log("Discard Error: ", error);
      toast.error(
        MESSAGES[error?.data?.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
    }
  };

  return (
    <div>
      <Button
        variant={"primary"}
        onClick={() => (isPostNow ? handlePostNow() : handlePostSchedule())}
        disabled={isVideoUploaded}
      >
        {isPostNow ? "Post" : "Schedule"}
      </Button>
      <Button
        variant={"secondary"}
        onClick={handleDiscard}
        disabled={isVideoUploaded}
      >
        Discard
      </Button>
    </div>
  );
}
