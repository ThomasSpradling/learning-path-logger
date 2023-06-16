import { useStore } from '@/zustand/store';
import { FaPlus } from 'react-icons/fa';
import { Handle, Position } from 'reactflow';

export default function EditStartNode() {
  const createFromStartNode = useStore((state) => state.createFromStartNode);
  const handleAddNode = () => {
    createFromStartNode('');
  };

  return (
    <div className='border-b-2 border-green-700 bg-green-200 p-4 relative'>
      <p>Start Here!</p>
      <Handle type='source' position={Position.Bottom} />
      <button
        className='bg-thisle py-1 px-7 rounded-full absolute -bottom-10 left-1/2 -translate-x-1/2 text-englishViolet opacity-70 hover:opacity-90'
        onClick={handleAddNode}
      >
        <FaPlus />
      </button>
    </div>
  );
}
