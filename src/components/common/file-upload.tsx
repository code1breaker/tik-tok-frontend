"use client";
import { cn } from "@/src/lib/utils";
import { createContext, useContext, useRef, useState } from "react";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia } from "../ui/empty";
import { Input } from "../ui/input";

type FileUploadContextProps = {
  inputFileRef: React.RefObject<HTMLInputElement | null>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onFileChange?: ({ value }: { value: File[] }) => void;
};

type FileUploadProps = React.ComponentProps<"div"> & {
  onFileChange?: ({ value }: { value: File[] }) => void;
};

const FileUploadContext = createContext<FileUploadContextProps | null>(null);
const useFileUpload = () => {
  const context = useContext(FileUploadContext);

  if (!context) {
    throw new Error("useFileUpload must be used within a <FileUpload />");
  }

  return context;
};

const FileUploadProvider = ({
  children,
  onFileChange,
}: {
  children: React.ReactNode;
  onFileChange?: ({ value }: { value: File[] }) => void;
}) => {
  const inputFileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUploadContext.Provider
      value={{
        inputFileRef,
        isDragging,
        setIsDragging,
        files,
        setFiles,
        onFileChange,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

export function FileUpload({
  className,
  children,
  onFileChange,
  ...props
}: FileUploadProps) {
  return (
    <FileUploadProvider onFileChange={onFileChange}>
      <div data-slot="file" className={cn(className)} {...props}>
        {children}
      </div>
    </FileUploadProvider>
  );
}

export function FileHiddenInput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { inputFileRef, setFiles, onFileChange } = useFileUpload();
  return (
    <div data-slot="file-input" className={cn("hidden", className)} {...props}>
      <Input
        ref={inputFileRef}
        id="picture"
        type="file"
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files || []);
          setFiles(selectedFiles);
          onFileChange?.({ value: selectedFiles });
        }}
      />
    </div>
  );
}

export function FileTrigger({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { inputFileRef } = useFileUpload();

  return (
    <div
      data-slot="file-trigger"
      className={cn(className)}
      onClick={(e) => {
        inputFileRef?.current?.click();
      }}
      {...props}
    />
  );
}

export function FileDropzone({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { isDragging, setIsDragging, setFiles, onFileChange } = useFileUpload();

  return (
    <Empty
      data-slot="file-dropzone"
      className={cn(
        "border border-dashed",
        isDragging ? "border-primary" : "border-muted",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
        onFileChange?.({ value: droppedFiles });
      }}
      {...props}
    >
      {children}
    </Empty>
  );
}

export function FileDropzoneHeader({
  className,
  ...props
}: React.ComponentProps<typeof EmptyHeader>) {
  return <EmptyHeader className={cn(className)} {...props} />;
}

export function FileDropzoneMedia({
  className,
  ...props
}: React.ComponentProps<typeof EmptyMedia>) {
  return <EmptyMedia variant="icon" className={cn(className)} {...props} />;
}

export function FileDropzoneContent({
  className,
  ...props
}: React.ComponentProps<typeof EmptyContent>) {
  return <EmptyContent className={cn(className)} {...props} />;
}
