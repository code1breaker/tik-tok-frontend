export const uploadConfig = [
  {
    title: "Size and duration",
    description: "Maximum size: 10 GB, video duration: 60 minutes",
  },
  {
    title: "File formats",
    description: 'Recommended: ".mp4" Other major formats are supported',
  },
  {
    title: "Video resolutions",
    description: "High resolution recommended: 1080p, 1440p",
  },
  {
    title: "Aspect ratios",
    description: "Recommended: 16:9 for landscape, 9:16 for vertical ",
  },
];

export default function UploadFooter() {
  return (
    <>
      {uploadConfig.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </>
  );
}
