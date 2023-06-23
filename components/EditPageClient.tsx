'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaBox,
  FaCheckSquare,
  FaEdit,
  FaRegSquare,
  FaSave,
  FaSquare,
} from 'react-icons/fa';
import Editor from './Editor';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function EditPageClient({
  sessionUserId,
  userId,
  content,
  title,
  subjectId,
  complete,
}: {
  sessionUserId: string | null;
  userId: string | null;
  content: string;
  title: string;
  subjectId: string;
  complete: boolean;
}) {
  const { toast } = useToast();

  const [isComplete, setIsComplete] = useState<boolean>(complete);

  const [isEdit, setIsEdit] = useState(false);
  const isAuthenticated = sessionUserId && userId && sessionUserId === userId;

  const [editContent, setEditContent] = useState(content);

  const router = useRouter();

  const { mutate: subjectEdit, isLoading: editIsLoading } = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      const { data } = await axios.put('/api/subject/edit', {
        id: subjectId,
        content,
      });

      setIsEdit(false);

      return data;
    },
    onError: () => {
      return toast({
        title: 'Error',
        description: 'There was an error changing the content',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: subjectComplete, isLoading: completeIsLoading } = useMutation(
    {
      mutationFn: async () => {
        const { data } = await axios.put('/api/subject/complete', {
          id: subjectId,
          complete: !complete,
        });

        setIsComplete(data.complete);

        return data;
      },
      onError: () => {
        return toast({
          title: 'Error',
          description: 'There was an error marking this as complete',
          variant: 'destructive',
        });
      },
      onSuccess: () => {
        router.refresh();
      },
    }
  );

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <h3 className='text-3xl font-bold mb-10'>{title || ''}</h3>
        {isAuthenticated && editIsLoading ? (
          <button
            className='bg-blue-100 text-gray-600 text-2xl p-2 rounded-lg border-2 border-gray-600 cursor-not-allowed'
            disabled
          >
            <Loader2 className='animate-spin' />
          </button>
        ) : isEdit ? (
          <button
            onClick={(e) => subjectEdit({ content: editContent })}
            className='bg-blue-100 text-blue-600 text-2xl p-2 rounded-lg border-2 border-blue-600'
          >
            <FaSave />
          </button>
        ) : (
          content.length > 0 && (
            <button
              onClick={(e) => setIsEdit(true)}
              className='bg-orange-100 text-orange-600 text-2xl p-2 rounded-lg border-2 border-orange-600'
            >
              <FaEdit />
            </button>
          )
        )}
      </div>

      {isAuthenticated && (
        <button
          onClick={(e) => subjectComplete()}
          className='flex flex-row gap-4 items-center mb-10'
          disabled={completeIsLoading}
        >
          <span className='text-3xl'>
            {completeIsLoading ? (
              <Loader2 className='animate-spin' />
            ) : isComplete ? (
              <FaCheckSquare className='text-green-600' />
            ) : (
              <FaRegSquare />
            )}
          </span>
          <span className='text-xl'>Mark as Complete</span>
        </button>
      )}

      {!isEdit &&
        (content.length > 0 ? (
          <p className='whitespace-pre'>{content}</p>
        ) : (
          <div className='w-full h-48 border-4 border-gray-300 border-dashed flex flex-col items-center justify-center text-gray-400 gap-10'>
            Looks like there is nothing here...
            {isAuthenticated && (
              <button
                onClick={() => setIsEdit(true)}
                className='rounded-lg p-4 border-2 border-roseQuartz text-roseQuartz flex items-center gap-4 flex-row hover:border-gray-600 hover:text-gray-600'
              >
                Add some notes <FaEdit />
              </button>
            )}
          </div>
        ))}

      {isEdit && (
        <Editor editContent={editContent} setEditContent={setEditContent} />
      )}
    </div>
  );
}
