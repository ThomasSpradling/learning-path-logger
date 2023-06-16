import { useStore } from '@/zustand/store';
import { FaPlus } from 'react-icons/fa';
import { Handle, Position } from 'reactflow';

export default function StartNode() {
  return (
    <div className='border-b-2 border-green-700 bg-green-200 p-4 relative'>
      <p>Start Here!</p>
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
}
