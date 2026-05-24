const getFilenameWithoutExtension = ({ filename }: { filename: string }) => {
  if (!filename) throw new Error("Invalid filename");

  const newFilename = filename.split(".").slice(0, -1).join("");

  return newFilename;
};

export default getFilenameWithoutExtension;
