import { useStore } from '@/zustand/store';
import { FaCheck } from 'react-icons/fa';
import { Handle, Position } from 'reactflow';

export default function DefaultNode({
  id,
  data,
}: {
  data: { label: string; complete: boolean };
  id: string;
}) {
  const markComplete = useStore((state) => state.markSubjectAsComplete);

  const handleClick = () => {
    if (data.complete) {
      markComplete(id, false);
    }
  };

  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div
        className={`border-2 transition-all rounded-lg p-4 shadow-gray-400 relative ${
          data.complete
            ? 'bg-green-100 border-green-600 border-solid text-black shadow-lg hover:shadow-gray-600 cursor-pointer'
            : 'bg-gray-100 border-gray-400 border-dashed text-gray-400 cursor-not-allowed'
        }`}
        onClick={handleClick}
      >
        <p>{data.label}</p>
        {data.complete && (
          <div className='absolute -top-3 -right-3 text-green-560 text-green-600 bg-green-300 border-2 border-green-600 p-1 rounded-full'>
            <FaCheck />
          </div>
        )}
        <Handle type='source' position={Position.Bottom} />
      </div>
    </>
  );
}
