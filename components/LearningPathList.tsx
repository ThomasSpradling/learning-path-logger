import { LearningPathThumbnail } from '@/types/LearningPathTypes';
import LearningPathListEntry from './LearningPathListEntry';
import AddPlaceholder from './AddPlaceholder';

type Props = {
  learningPaths: LearningPathThumbnail[];
};

export default function LearningPathList({ learningPaths }: Props) {
  return (
    <div className='border-2 border-red-500 w-3/4 border-dashed mt-10 p-10 grid grid-cols-3 gap-4'>
      {learningPaths.map((learningPath: LearningPathThumbnail) => (
        <LearningPathListEntry
          key={learningPath.id}
          learningPath={learningPath}
        />
      ))}
      <AddPlaceholder />
    </div>
  );
}
