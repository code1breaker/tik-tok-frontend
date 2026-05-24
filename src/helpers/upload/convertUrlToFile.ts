import axios from "axios";
import getFilenameWithoutExtension from "./getFilenameWithoutExtension";

export interface ConvertUrlToFileIf {
  url: string;
  filename?: string;
}

const convertUrlToFile = async ({ url, filename = "" }: ConvertUrlToFileIf) => {
  if (!url) throw new Error("Invalid url");

  const newFilename = getFilenameWithoutExtension({ filename }) || "cover";
  const res = await axios.get(url, { responseType: "blob" });
  const blob = res.data;
  const file = new File([blob], newFilename, { type: blob.type });

  return file;
};

export default convertUrlToFile;
