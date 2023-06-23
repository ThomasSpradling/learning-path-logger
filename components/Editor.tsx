'use client';

import { Dispatch, SetStateAction, useRef } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

export default function Editor({
  editContent,
  setEditContent,
}: {
  editContent: string;
  setEditContent: Dispatch<SetStateAction<string>>;
}) {
  return (
    <TextareaAutosize
      className='bg-white w-full border border-zinc-300 rounded-lg px-10 py-10'
      onChange={(e) => setEditContent(e.target.value)}
      value={editContent}
    />
  );
}
