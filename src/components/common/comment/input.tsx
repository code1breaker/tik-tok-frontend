import { Controller, useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Field } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { HiPaperAirplane } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/src/hooks/store";
import { useEffect, useRef } from "react";
import { commentFormSchema } from "../../video-details/video-comment/input";
import z from "zod";
import { toast } from "sonner";
import { MESSAGES } from "@/src/constants/messages";
import * as postApi from "@/src/services/post/post.client";
import { addComment } from "@/src/lib/store/videoCommentSlice";
import { increaseCommentCount } from "@/src/lib/store/video-details-slice";
import {
  AddCommentIf,
  CommentInputPropsIf,
} from "@/src/types/components/common/comment.types";

export default function CommentInput({
  videoId,
  reply,
  setReply,
}: CommentInputPropsIf) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset, setValue } = useForm<
    z.infer<typeof commentFormSchema>
  >({
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
    const username = reply?.userId?.username ?? "";
    setValue("comment", username ? `@${username} ` : "");
  }, [reply]);

  const onSubmit = async (data: AddCommentIf) => {
    try {
      const { comment = "" } = data;
      const body = {
        message: comment,
        parentId: reply?.parentId || reply?._id,
        replyParentId: reply?._id,
      };

      const res = await postApi.addPostComments({
        postId: videoId,
        body,
      });
      dispatch(addComment(res?.data?.data));
      dispatch(increaseCommentCount({ videoId }));
      reset();
      setReply(null);
      toast.success("Comment added successfully", { position: "top-right" });
    } catch (error: any) {
      console.log("Add Comment Error: ", error);
      toast.error(
        MESSAGES[error.data.code as keyof typeof MESSAGES] ||
          MESSAGES.DEFAULT_MESSAGE,
      );
    }
  };
  return (
    <div className="flex items-center gap-2 py-2">
      <Avatar className="size-10 ">
        <AvatarImage src="https://github.com/evilrabbit.png" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full flex items-center gap-4"}
      >
        <Controller
          name="comment"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                ref={inputRef}
                id="comment"
                aria-invalid={fieldState.invalid}
                placeholder="Add a comment"
              />
            </Field>
          )}
        />
        <Button variant={"outline"} size={"icon-lg"} type="submit" className="">
          <HiPaperAirplane />
        </Button>
      </form>
    </div>
  );
}
