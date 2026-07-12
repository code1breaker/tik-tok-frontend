"use-client";
import { IoVolumeHighSharp, IoVolumeMuteSharp } from "react-icons/io5";

export interface VideoVolumeBtnPropsIf {
  isVolumeEnable: boolean;
  onToggleVolume: () => void;
  className?: string;
}

export default function VideoVolumeBtn({
  isVolumeEnable,
  onToggleVolume,
  className,
}: VideoVolumeBtnPropsIf) {
  return (
    <div
      className={`w-fit absolute bg-input rounded-full text-2xl p-1 cursor-pointer ${className}`}
    >
      {isVolumeEnable ? (
        <IoVolumeHighSharp onClick={() => onToggleVolume()} />
      ) : (
        <IoVolumeMuteSharp onClick={() => onToggleVolume()} />
      )}
    </div>
  );
}
