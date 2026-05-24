const createFrame = ({ video }: { video: HTMLVideoElement }) => {
  if (!video) throw new Error("Invalid video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const img = canvas.toDataURL("image/jpeg");
  return img;
};

export default createFrame;
