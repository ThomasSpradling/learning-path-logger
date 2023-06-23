import { useStore } from '@/zustand/store';
import { Select, MenuItem } from '@mui/material';
import UnitItem from './UnitItem';
import { Schedule } from '@/types/LearningPathTypes';

export default function EditSchedule({
  units,
  schedule,
  showAdd,
}: {
  units: { id: string; title: string; order: number }[];
  schedule: Schedule;
  showAdd: boolean;
}) {
  const addUnit = useStore((state) => state.addUnit);

  const handleAddUnit = () => {
    addUnit('', units.length);
  };
  return (
    <div className='w-full min-h-full bg-gray-200 items-center flex flex-col'>
      <div className='w-2/3 bg-white rounded-lg my-10 py-10 flex-grow'>
        <div className='flex gap-4 flex-col items-center'>
          {units.map((unit) => (
            <UnitItem key={unit.id} unit={unit} schedule={schedule} />
          ))}
          {showAdd && (
            <button
              className='bg-white border-2 border-roseQuartz w-1/3 p-3 rounded-lg block hover:bg-gray-100 text-lg'
              onClick={handleAddUnit}
            >
              Add Unit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
