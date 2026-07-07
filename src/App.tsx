import { useState } from 'react'
import './App.css'
import Editor from "./components/Editor";
import MemoList from "./components/MemoList";
import type { JSX } from 'react';
import type { MemoType } from "./types/index.tsx";

function App(): JSX.Element {
  const [memos, setMemos] = useState<MemoType[]>([])

  const pushMemo =  (text: string) => {
    if (!text.trim()) return;
    const id = memos.length > 0
      ? Math.max(...memos.map(c => c.id)) + 1
      : 0;
    const newMemo = {
      id: id,
      text: text,
      date: new Date()
    }

    setMemos([newMemo, ...memos])
  }

  console.log(memos);

  return (
    <>
      <h1>My Simple Memo</h1>
      <Editor 
        onSubmit={pushMemo}
      />
      <MemoList memos={memos} setMemos={setMemos} />
    </>
  )
}

export default App
