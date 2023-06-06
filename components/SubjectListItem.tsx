import { SubjectItem } from '@/types/LearningPathTypes';
import { FaCheck } from 'react-icons/fa';

export default function SubjectListItem({ subject }: { subject: SubjectItem }) {
  return (
    <div
      className={`relative w-full p-4 shadow-lg mb-4 ml-5 rounded-lg ${
        subject.complete ? 'border-2 border-green-700 bg-green-100' : 'bg-white'
      }`}
    >
      {subject.complete ? (
        <div className='absolute -top-2 -right-2 rounded-full bg-green-300 border-2 border-green-700 text-green-700 p-2'>
          <FaCheck />
        </div>
      ) : (
        ''
      )}
      <h4 className='text-md'>{subject.title}</h4>
    </div>
  );
}
