import { Dispatch, RefObject, SetStateAction } from "react";
import { UserIf } from "../../user.types";

export interface CommentIf {
  _id: string;
  message: string;
  userId: UserIf;
  videoId: string;
  replyCount: number;
  parentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentPropsIf {
  videoId: string;
}

export interface CommentListPropsIf {
  comments: CommentIf[];
  setReply: Dispatch<SetStateAction<null | CommentIf>>;
  scrollRef: RefObject<HTMLDivElement | null>;
}

export interface CommentInputPropsIf {
  videoId: string;
  reply: CommentIf | null;
  setReply: Dispatch<SetStateAction<null | CommentIf>>;
}

export interface AddCommentIf {
  comment: string;
}

export interface CommentItemPropsIf {
  item: CommentIf;
  setReply: Dispatch<SetStateAction<null | CommentIf>>;
}

export interface CommentReplyPropsIf {
  commentId: string;
  setReply: Dispatch<SetStateAction<null | CommentIf>>;
}
