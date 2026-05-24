"use client";
import UploadDetailsForm from "./upload-details-form";
import UploadFileInfo from "./upload-file-info";
import UploadPreview from "./upload-preview";
import UploadSettingsForm from "./upload-settings-form";
import UploadFormAction from "./upload-form-action";

export default function UploadSettings() {
  return (
    <div className="p-5 w-full space-y-5">
      {/* File Selected */}
      <UploadFileInfo />

      <div className="flex gap-4 w-full">
        <div className="w-2/3 space-y-5">
          <UploadDetailsForm />
          <UploadSettingsForm />
          <div className="space-x-5">
            <UploadFormAction />
          </div>
        </div>

        <div className="w-1/3">
          <UploadPreview />
        </div>
      </div>
    </div>
  );
}
