import { Dispatch, SetStateAction } from "react";

export interface UserIf {
  _id: string;
  fullname: string;
  username: string;
  photoUrl: string;
}

export interface CommentIf {
  _id: string;
  message: string;
  userId: UserIf;
  postId: string;
  createdAt: string;
  updatedAt: string;
  replies: CommentIf[];
}
export interface ReplyIf {
  _id: string;
  message: string;
  userId: UserIf;
  postId: string;
  parentId: string;
  replyParentId: string;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface VideoCommentItemPropsIf {
  item: Record<string, any>;
  setReply: any;
}

export interface CommentReplyPropsIf {
  commentId: string;
  setReply: any;
}

export interface AddCommentIf {
  comment: string;
}
export interface VideoCommentInputPropsIf {
  reply: Record<string, any>;
  setReply: Dispatch<SetStateAction<{}>>;
}
