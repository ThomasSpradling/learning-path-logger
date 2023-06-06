import ILearningPath from '@/components/LearningPathInterface';
import prisma from '@/lib/db';

type Props = {
  params: {
    path_id: string;
  };
};

export default async function LearningPath({ params }: Props) {
  const metadata = await prisma.learningPath.findUnique({
    where: {
      id: params.path_id,
    },
    select: {
      id: true,
      title: true,
      backdrop: true,
      complete: true,
    },
  });
  return metadata ? <ILearningPath metadata={metadata} /> : '404 error';
}
