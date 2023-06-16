'use client';

import { Subject } from '@prisma/client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';

export default function SubjectLink({
  subject,
  path_id,
}: {
  subject: { id: string; title: string; complete: boolean };
  path_id: string;
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <Link
      href={`/learning-path/${path_id}/${subject.id}`}
      className={`block ${
        segment === subject.id ? 'bg-thisle left-3' : ''
      } rounded-lg px-5 py-2 mx-4 my-1 hover:bg-thisle relative left-0 transition-all duration-200 hover:left-3 flex gap-2 items-center`}
    >
      {subject.complete ? (
        <div
          className={`p-2 rounded-full ${
            segment === subject.id ? 'bg-white' : 'bg-green-200'
          }`}
        >
          <FaCheck />
        </div>
      ) : (
        <></>
      )}
      {subject.title}
    </Link>
  );
}
