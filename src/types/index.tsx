export type MemoType = {
  id: number;
  text: string;
  date: Date;
}

export type CommentType = {
  id: number;
  memoId: number;
  text: string;
  date: Date;
}