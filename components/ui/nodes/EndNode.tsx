import { Handle, Position } from 'reactflow';

export default function EndNode({ data }: { data: { open: boolean } }) {
  return (
    <>
      <div
        className={`bg-[#fbc2ff] p-4 border-t-4 border-t-roseQuartz ${
          data.open ? 'cursor-pointer' : 'grayscale cursor-not-allowed'
        }`}
      >
        <Handle type='target' position={Position.Top} />
        <p>Complete! 🎉</p>
      </div>
    </>
  );
}
