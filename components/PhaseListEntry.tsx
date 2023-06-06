import { Phase, SubjectItem } from '@/types/LearningPathTypes';
import SubjectListItem from './SubjectListItem';

// const subjectMock: SubjectItem[] = [
//   {
//     id: '1',
//     title: 'Subject A',
//     complete: false,
//   },
//   {
//     id: '2',
//     title: 'Subject B',
//     complete: false,
//   },
//   {
//     id: '3',
//     title: 'Subject C',
//     complete: true,
//   },
// ];

export default function PhaseListEntry({ phase }: { phase: Phase }) {
  return (
    <div className='mb-10 w-full'>
      <h3 className='text-lg mb-4'>{phase.title}</h3>
      {phase.subjects?.map((subject) => (
        <SubjectListItem key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
