"use client";
import { useAppSelector } from "@/src/hooks/store";
import UploadFile from "./upload-file";
import UploadSettings from "./upload-settings";

export default function UploadScreen() {
  const file = useAppSelector((state) => state.upload.file);

  return <>{!file ? <UploadFile /> : <UploadSettings />}</>;
}
