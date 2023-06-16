import { useStore } from '@/zustand/store';
import { Handle, Position } from 'reactflow';

export default function LayerNode({
  id,
  data,
}: {
  id: string;
  data: { label: string; complete: string };
}) {
  const markComplete = useStore((state) => state.markSubjectAsComplete);

  const handleClick = () => {
    markComplete(id, true);
  };
  return (
    <>
      <Handle type='target' position={Position.Top} />
      <div
        className='border-2 cursor-pointer border-black rounded-lg animate-yellow-to-white p-4'
        onClick={handleClick}
      >
        <p>{data.label}</p>
        <Handle type='source' position={Position.Bottom} />
      </div>
      <Handle type='source' position={Position.Bottom} />
    </>
  );
}
