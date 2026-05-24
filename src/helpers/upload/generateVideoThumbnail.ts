import createFrame from "./createFrame";

const generateVideoThumbnail = async ({ videoSrc = "", noOfThumbnail = 5 }) => {
  if (!videoSrc) throw new Error("Invalid video source");

  const video = document.createElement("video");
  video.src = videoSrc;
  video.muted = true;

  await new Promise((resolve) => {
    video.onloadedmetadata = resolve;
  });

  if (!video || !video.duration) throw new Error("Invalid video");

  const interval = video.duration / noOfThumbnail;
  const originalTime = video.currentTime;
  const thumbnailsData = [];

  for (let i = 0; i < noOfThumbnail; i++) {
    const targetTimeStamp = interval * i;

    video.currentTime = targetTimeStamp;

    await new Promise((resolve) => {
      video.onseeked = resolve;
    });

    const frame = createFrame({ video });
    thumbnailsData.push(frame);
  }

  video.currentTime = originalTime;

  return thumbnailsData;
};

export default generateVideoThumbnail;
