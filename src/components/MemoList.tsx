import { useState } from 'react'
import type { JSX } from 'react';
import type { MemoType, CommentType } from "../types";
import Editor from "./Editor";
import ContentBody from "./ContentBody";
import CommentList from "./CommentList";
import { FaRegComment } from "react-icons/fa";

type MemoListProps = {
  memos: MemoType[];
  setMemos: React.Dispatch<React.SetStateAction<MemoType[]>>;
};

const MemoList = (props: MemoListProps): JSX.Element => {
  const [comments, setComments] = useState([])
  const [editingMemoId, setMemoEditingId] = useState(null)
  const [editMemoText, setMemoEditText] = useState("")
  const [commentReEditingId, setCommentReEditingId] = useState(null)
  const [commentReEditingText, setCommentReEditingText] = useState("")
  const [commentEditingId, setCommentEditingId] = useState(null)
  const [commentEditingText, setCommentEditingText] = useState("")

  const saveEditMemo = (id, text) => {
    if (!text.trim()) return;
    console.log(text);
    props.setMemos(prev => 
      prev.map(item =>
        item.id === id ? {...item, text: text, date: new Date().toISOString()} : item
      )
    )

    setMemoEditingId(null)
    setMemoEditText("")
  }

  const saveEditComment = (id, text) => {
    if (!text.trim()) return;
    console.log(text);
    setComments(prev => 
      prev.map(item =>
        item.id === id ? {...item, text: text, date: new Date()} : item
      )
    )

    setCommentReEditingId(null)
    setCommentReEditingText("")
  }

  const startMemoEdit = (target) => {
    setMemoEditingId(target.id);
    setMemoEditText(target.text);
  }

  const startReCommentEdit = (target) => {

    setCommentReEditingId(target.id);
    setCommentReEditingText(target.text);
  }

  const deleteMemo = (id) => {
    props.setMemos(prev => prev.filter(m => m.id !== id));
    setComments(prev => prev.filter(c => c.memoId !== id));
  };

   const deleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const saveComment = (memoId, text) => {
    console.log("保存しにきてる", text);
    if (!text.trim()) return;
    const id = comments.length > 0
      ? Math.max(...comments.map(c => c.id)) + 1
      : 0;
    const newComment = {
      id: id,
      memoId: memoId,
      text: text,
      date: new Date()
    }

    setComments([newComment, ...comments])
    //setCommentEditingText("")
    setCommentEditingId(null)
  }

console.log(comments);
console.log("中身を見るよ", commentEditingId);
  return(
    <div id="add-memo-area">
      {props.memos.map((memo) => {
        const memoComments = comments.filter(
          c => c.memoId === memo.id
        );
        console.log(memoComments);
        return (
        <div className='saved-memo' key={memo.id}>
          {editingMemoId === memo.id ? (
            <Editor 
                onSubmit={(text) =>
                  saveEditMemo(
                    editingMemoId,
                    text
                  )
                }
                initialValue={memo.text}
              />
          ):(
          <>
            <ContentBody 
              content={memo}
              deleteMemo={deleteMemo}
              startEdit={startMemoEdit}
            />

            <div style={{ borderBottom: "1px solid" }} />

            <div className='comment'>
              
              <CommentList 
                memoComments={memoComments}
                commentReEditingId={commentReEditingId}
                memo={memo}
                deleteMemo={deleteComment}
                startEdit={startReCommentEdit}
                saveEditComment={saveEditComment}
                setCommentReEditingId={setCommentReEditingId}
              />
            {commentEditingId === memo.id ? 
              (
                <div className='huutunokomento'>
                <Editor 
                    onSubmit={(text) =>
                      saveComment(
                        memo.id,
                        text
                      )
                    }
                    setEditId={setCommentEditingId}
                  />
                  </div>
              ):(
                <FaRegComment className='icon' onClick={() => setCommentEditingId(memo.id)}/>
              )
            }
            </div>
          </>
        )}
        </div>
        );
      })}
    </div>
  )
}

export default MemoList