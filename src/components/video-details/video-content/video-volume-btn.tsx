"use-client";
import { IoVolumeHighSharp, IoVolumeMuteSharp } from "react-icons/io5";

export interface VideoVolumeBtnPropsIf {
  isVolumeEnable: boolean;
  onToggleVolume: () => void;
}

export default function VideoVolumeBtn({
  isVolumeEnable,
  onToggleVolume,
}: VideoVolumeBtnPropsIf) {
  return (
    <div className="absolute bottom-5 right-5 bg-input rounded-full text-2xl p-1 cursor-pointer">
      {isVolumeEnable ? (
        <IoVolumeHighSharp onClick={() => onToggleVolume()} />
      ) : (
        <IoVolumeMuteSharp onClick={() => onToggleVolume()} />
      )}
    </div>
  );
}
