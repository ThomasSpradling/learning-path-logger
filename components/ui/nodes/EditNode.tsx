import { useStore } from '@/zustand/store';
import { FaCheck, FaFlag, FaPlus, FaTrash } from 'react-icons/fa';
import { Handle, Position } from 'reactflow';

export default function EditNode({
  id,
  data,
}: {
  id: string;
  data: { label: string; outDegree: string[] };
}) {
  const existsEnd = useStore((state) => state.existsEnd);
  const setExistsEnd = useStore((state) => state.setExistsEnd);

  const deleteSubject = useStore((state) => state.deleteSubject);
  const handleTrash = () => {
    deleteSubject(id);
  };

  const createSubject = useStore((state) => state.createSubject);
  const handleAddNode = () => {
    createSubject('', '0', id);
  };

  const createEndNode = useStore((state) => state.createEndNode);
  const handleAddEnd = () => {
    createEndNode(id);
    setExistsEnd(true);
  };

  const changeText = useStore((state) => state.setSubjectTitle);
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeText(id, e.target.value);
  };

  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div
        className={`border border-gray-400 transition-all rounded-lg px-4 py-2 shadow-lg shadow-gray-300 relative bg-white`}
      >
        <input
          className='outline-none focus:bg-slate-100 px-2 text-center'
          value={data.label}
          placeholder='Example Subject'
          onChange={handleChangeText}
        ></input>
        <Handle type='source' position={Position.Bottom} />
        <button
          className='bg-thisle py-1 px-7 rounded-full absolute -bottom-10 left-1/2 -translate-x-1/2 text-englishViolet opacity-70 hover:opacity-90'
          onClick={handleAddNode}
        >
          <FaPlus />
        </button>
        {data.outDegree?.length === 0 && (
          <button
            onClick={handleTrash}
            className='bg-red-100 p-2 rounded-full absolute -top-3 -right-3 text-red-400 hover:text-red-600 opacity-100 hover:opacity-90'
          >
            <FaTrash />
          </button>
        )}
        {!existsEnd && (
          <button
            onClick={handleAddEnd}
            className='bg-blue-100 p-2 rounded-full absolute -bottom-3 -left-3 text-celticBlue opacity-100 hover:opacity-90 hover:text-blue-800'
          >
            <FaFlag />
          </button>
        )}
      </div>
    </>
  );
}
