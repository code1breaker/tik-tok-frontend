import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export function ProfileAvatar({ src }: { src: string }) {
  return (
    <Avatar className="w-40 h-40">
      <AvatarImage src={src} alt="@shadcn" className="grayscale" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
