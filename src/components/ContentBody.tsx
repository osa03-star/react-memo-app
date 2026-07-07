import type { JSX } from 'react';
import type { MemoType, CommentType } from "../types";
import { GoPencil } from "react-icons/go";
import { CiTrash } from "react-icons/ci";

type contentBodyProps = {
  content: MemoType | CommentType;
  deleteMemo: (id: number) => void;
  startEdit: (memo: MemoType | CommentType) => void;
  setEditId?: React.Dispatch<React.SetStateAction<number|null>>;
}

const ContentBody = (props: contentBodyProps): JSX.Element => {
  return(
    <>
      <div className='header'>
        <p>{props.content.date.toLocaleString()}</p>
        <GoPencil onClick={() => {props.startEdit(props.content); props.setEditId?.(props.content.id);}}/>
        <CiTrash onClick={() => props.deleteMemo(props.content.id)} />
      </div>
      <p className='memo'>{props.content.text}</p>
    </>
  )
}

export default ContentBody