export type MemoType = {
  id: number;
  text: string;
  date: string;
}

export type CommentType = {
  id: number;
  memoId: number;
  text: string;
  date: string;
}