'use client';

import { useToast } from '@/hooks/useToast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaCamera, FaPlus } from 'react-icons/fa';

export default function AddPhoto({ pathId }: { pathId: string }) {
  const router = useRouter();

  const ref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [image, setImage] = useState<string>('');

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!
        );

        const image = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          formData
        );

        await axios.put('/api/image', {
          pathId,
          backdrop: image.data.secure_url,
        });

        router.refresh();
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'Error',
        description: 'There was an error uploading the file',
        variant: 'destructive',
      });
    }
  };

  const handleFileClick = () => {
    ref.current?.click();
  };

  return (
    <div className='mb-20'>
      <input
        type='file'
        id='file-input'
        className='hidden'
        ref={ref}
        accept='.jpg, .jpeg, .png, .gif'
        onChange={handleFile}
      />
      <button
        className='p-4 bg-gray-300 z-20 opacity-40 rounded-full mb-10 hover:opacity-70 relative'
        onClick={handleFileClick}
      >
        <FaCamera className='text-5xl' />
        <div className='absolute -top-2 -right-2 z-30 bg-gray-300 p-2 rounded-full text-md'>
          <FaPlus />
        </div>
      </button>
    </div>
  );
}
