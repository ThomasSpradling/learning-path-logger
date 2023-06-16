import { useStore } from '@/zustand/store';
import { FaTrash } from 'react-icons/fa';
import { Handle, Position } from 'reactflow';

export default function EditEndNode() {
  const existsEnd = useStore((state) => state.existsEnd);
  const setExistsEnd = useStore((state) => state.setExistsEnd);

  const deleteEndNode = useStore((state) => state.deleteEndNode);
  const handleTrash = () => {
    deleteEndNode();
    setExistsEnd(false);
  };

  const handleDelete = () => {};
  return (
    <>
      <div
        className={`bg-[#fbc2ff] p-4 border-t-4 border-t-roseQuartz relative`}
      >
        <Handle type='target' position={Position.Top} />
        <button
          className='bg-red-100 p-2 rounded-full absolute -top-3 -right-3 text-red-400 opacity-100 hover:opacity-90 hover:text-red-600'
          onClick={handleTrash}
        >
          <FaTrash />
        </button>
        <p>Complete! 🎉</p>
      </div>
    </>
  );
}
