import { LearningPathThumbnail, Progress } from '@/types/LearningPathTypes';
import Flow from './ui/Flow';
import _ from 'underscore';
import { useEffect, useState } from 'react';

export default function PreqGraph({
  metadata,
}: {
  metadata: LearningPathThumbnail;
}) {
  const [progress, setProgress] = useState<Progress>();
  useEffect(() => {
    fetch(`/api/paths/${metadata.id}/progress`)
      .then((response) => response.json())
      .then((data) => {
        setProgress(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [metadata.id]);

  if (progress?.nodes && progress?.edges) {
    return (
      <div className='border-2 border-red-500 w-2/3 border-dashed mt-10 h-full'>
        <Flow initialNodes={progress.nodes} initialEdges={progress.edges} />
      </div>
    );
  }
  return <>error</>;
}
