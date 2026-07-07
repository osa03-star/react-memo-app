import type { JSX } from 'react';
import type{ MemoType, CommentType } from "../types";
import ContentBody from './ContentBody';
import Editor from './Editor';

type CommentListProps = {
  memoComments: CommentType[];
  commentReEditingId: number | null;
  memo: MemoType;
  deleteMemo: (id: number) => void;
  startEdit: (memo: MemoType | CommentType) => void;
  saveEditComment: (id: number, text: string) => void;
  setCommentReEditingId: React.Dispatch<React.SetStateAction<number|null>>;
}

const CommentList = (props: CommentListProps): JSX.Element => {

  return(
    <>
      {props.memoComments.map((comment) => (
        props.commentReEditingId === comment.id &&
        props.memo.id === comment.memoId ? (
          <div className='re-comment' key={comment.id}>
            <Editor 
                onSubmit={(text) => {
                  if (props.commentReEditingId === null) return;
                  props.saveEditComment(
                    props.commentReEditingId,
                    text
                  )
                }}
                initialValue={comment.text}
              />
          </div>
        ) :   
          <div className='savedComment' key={comment.id}>
            <ContentBody 
                content={comment}
                deleteMemo={props.deleteMemo}
                startEdit={props.startEdit}
                setEditId={props.setCommentReEditingId}
              />
          </div>
        )
      )}
    </>
  )
}

export default CommentList