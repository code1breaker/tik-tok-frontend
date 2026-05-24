"use client";

import { MESSAGES } from "@/src/constants/messages";
import {
  setFile,
  setProgress,
  setUploadedFile,
  setUploadForm,
} from "@/src/lib/store/uploadSlice";
import { toast } from "sonner";
import * as uploadApi from "@/src/services/upload/upload.client";
import {
  FileDropzone,
  FileDropzoneContent,
  FileDropzoneHeader,
  FileDropzoneMedia,
  FileHiddenInput,
  FileTrigger,
  FileUpload,
} from "../common/file-upload";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import UploadFooter from "./upload-footer";
import { useAppDispatch } from "@/src/hooks/store";
import { FaCloudUploadAlt } from "react-icons/fa";
import * as videoApi from "@/src/services/video/video.client";

export default function UploadFile({}) {
  const dispatch = useAppDispatch();

  const handleFileChange = async (field: { value: File[] }) => {
    const file = field.value[0];
    const url = URL.createObjectURL(file);
    const { name, size, type } = file;
    dispatch(setFile({ url, name, size, type }));
    try {
      const signatureRes = await uploadApi.uploadSignature({
        filetype: "video",
      });
      const { url, folder, signature, apiKey, timestamp } =
        signatureRes.data?.data;
      const body = {
        file,
        folder,
        signature,
        api_key: apiKey,
        timestamp,
      };

      const uploadedRes = await uploadApi.uploadToCloudinary({
        url,
        body,
        onProgress: ({ progress, loaded, total }) => {
          dispatch(setProgress({ progress, loaded, total }));
        },
      });

      dispatch(setUploadedFile(uploadedRes?.data));

      const uploadBody = {
        filename: file.name,
        duration: uploadedRes.data?.duration,
        url: uploadedRes.data?.url,
      };
      const response = await videoApi.uploadVideo(uploadBody);

      dispatch(setUploadForm({ videoId: response.data?.data?._id }));

      toast.success("Video uploaded successfully");
    } catch (error: any) {
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
      console.log("Verify Email Error: ", error);
    }
  };

  return (
    <div className="p-5 w-full flex justify-center items-center">
      <Card className="w-4/5">
        <CardContent>
          {/* File Upload */}
          <FileUpload onFileChange={handleFileChange}>
            <FileHiddenInput />
            <FileDropzone className="h-96">
              <FileDropzoneHeader>
                <FileDropzoneMedia>
                  <FaCloudUploadAlt />
                </FileDropzoneMedia>
              </FileDropzoneHeader>

              <FileDropzoneContent>
                <p>Select video to upload</p>
                <p className="text-muted-foreground">
                  Drag & Drop to upload your video
                </p>

                <FileTrigger>
                  <Button variant="primary" className="w-40">
                    Select Video
                  </Button>
                </FileTrigger>
              </FileDropzoneContent>
            </FileDropzone>
          </FileUpload>
        </CardContent>

        <CardFooter className="gap-3">
          <UploadFooter />
        </CardFooter>
      </Card>
    </div>
  );
}
