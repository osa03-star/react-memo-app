import { useState } from "react";
import { FiSend } from "react-icons/fi";
import type { JSX } from 'react';

type EditorProps = {
  onSubmit: (text: string) => void;
  initialValue?: string;
  setEditId?: React.Dispatch<React.SetStateAction<number | null>>;
}


const Editor = (props: EditorProps): JSX.Element => {
  const [value, setValue] = useState(props.initialValue)
  
  return(
    <>
      <textarea style={{height: "200px"}} onChange={(e) => setValue(e.target.value)} value={value}/>
        <button 
        style={{marginTop: "2%", width: "100px", height: "40px", borderRadius: "11px", border: "none", background: "green"}}
        onClick={() => {props.onSubmit(value); setValue(""); props.setEditId?.(null);}}
        ><FiSend />
        </button>
    </>
  )
}
export default Editor