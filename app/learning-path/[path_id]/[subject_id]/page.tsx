import prisma from '@/lib/db';

export default async function LearningPath({
  params,
}: {
  params: { path_id: string; subject_id: string };
}) {
  const data = await prisma.subject.findUnique({
    select: {
      title: true,
      content: true,
    },
    where: {
      id: params.subject_id,
    },
  });

  return (
    <div className=''>
      <h3 className='text-3xl font-bold mb-10'>{data?.title || ''}</h3>
      <p>{data?.content || ''}</p>
    </div>
  );
}
