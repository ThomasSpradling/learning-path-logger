import { LearningPathThumbnail, Schedule } from '@/types/LearningPathTypes';
import PhaseListEntry from './PhaseListEntry';
import { useEffect, useState } from 'react';

export default function ScheduleList({
  metadata,
}: {
  metadata: LearningPathThumbnail;
}) {
  const [schedule, setSchedule] = useState<Schedule>([]);

  useEffect(() => {
    fetch(`/api/paths/${metadata.id}/schedule`)
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [metadata.id]);
  return (
    <div className='border-2 border-red-500 w-2/3 border-dashed mt-10 p-10'>
      {schedule.map((phase) => (
        <PhaseListEntry key={phase.id} phase={phase} />
      ))}
    </div>
  );
}
