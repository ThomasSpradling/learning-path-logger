import { Phase } from '@/types/LearningPathTypes';
import PhaseListEntry from './PhaseListEntry';

type Props = {
  learningPathId: string;
};

const phaseMock: Phase[] = [
  {
    id: '1',
    title: 'Phase 1',
  },
  {
    id: '2',
    title: 'Phase 2',
  },
  {
    id: '3',
    title: 'Phase 3',
  },
  {
    id: '4',
    title: 'Phase 4',
  },
];

export default function ScheduleList({ learningPathId }: Props) {
  return (
    <div className='border-2 border-red-500 w-2/3 border-dashed mt-10 p-10'>
      {phaseMock.map((phase) => (
        <PhaseListEntry key={phase.id} phase={phase} />
      ))}
    </div>
  );
}
