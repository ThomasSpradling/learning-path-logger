import SubjectLink from '@/components/SubjectLink';
import prisma from '@/lib/db';
import { exampleSubjects } from '@/mock';
import { convertSubjectPreviewToSchedule } from '@/utils';
import Link from 'next/link';
import { Fragment } from 'react';
import { FaChevronLeft, FaNetworkWired, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

export default async function Layout({
  params,
  children,
}: {
  params: { path_id: string };
  children: React.ReactNode;
}) {
  // TODO: Add verification by session
  const isUsers = true;

  // const meta = {
  //   id: '2',
  //   title: 'T3 Tech Stack',
  //   backdrop:
  //     'https://i1.wp.com/tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg?w=750&ssl=1',
  //   subjectsComplete: 8,
  //   subjectsCount: 10,
  // };

  const meta = await prisma.learningPath.findUnique({
    where: {
      id: params.path_id,
    },
    select: {
      title: true,
      backdrop: true,
    },
  });

  const data = await prisma.subject.findMany({
    where: { learningPathId: params.path_id },
    select: {
      learningPathId: true,
      complete: true,
      id: true,
      title: true,
      order: true,
      unit: {
        select: {
          id: true,
          title: true,
          order: true,
        },
      },
      prerequisites: {
        select: { id: true },
      },
      children: {
        select: { id: true },
      },
      prereqsHaveStart: true,
      childrenHaveEnd: true,
    },
  });

  console.log('DATA', data);

  const normalizedData = data.map((subject) => ({
    ...subject,
    prerequisites: [
      ...subject.prerequisites.map((prereq) => prereq.id),
      ...(subject.prereqsHaveStart ? ['START'] : []),
    ],
    children: [
      ...subject.children.map((child) => child.id),
      ...(subject.childrenHaveEnd ? ['END'] : []),
    ],
  }));

  const transformedData = convertSubjectPreviewToSchedule(normalizedData);
  return (
    <main className='flex-grow flex flex-col gap-100 overflow-auto bg-gray-100'>
      <div
        style={{ backgroundImage: `url(${meta?.backdrop})` }}
        className='min-h-[30vh] bg-red-100 bg-cover bg-center relative flex items-center justify-center bg-fixed'
      >
        <Link
          href='/dashboard'
          className='text-xl font-bold text-white absolute z-20 flex items-center gap-2 top-4 left-4 hover:left-2 transition-all hover:text-thisle'
        >
          <FaChevronLeft />
          <p>back</p>
        </Link>
        {isUsers && (
          <button className='bg-red-100 text-red-400 absolute z-20 p-2 rounded-lg right-4 top-4 text-3xl transition-all hover:bg-red-200'>
            <FaTrash />
          </button>
        )}
        <h2 className='text-3xl font-bold text-white absolute z-20'>
          {meta?.title}
        </h2>
        <Link
          href={`/learning-path/progress/${params.path_id}`}
          className='text-xl items-center flex font-bold absolute z-20 gap-4 bottom-5 transition-all bg-thisle p-4 rounded-lg hover:bg-white hover:text-roseQuartz'
        >
          <span>View Progress</span> <FaNetworkWired />
        </Link>
        <div className='absolute inset-0 w-full h-full bg-englishViolet opacity-80'></div>
      </div>
      <div className='flex flex-row'>
        <nav className='bg-white pb-5 w-1/4 relative -top-5 shadow-lg ml-10 rounded-xl flex-shrink-1'>
          {
            <>
              {transformedData.map((unit) => (
                <Fragment key={'unit' + unit.id}>
                  <h3 className='text-2xl m-5 font-bold'>{unit.title}</h3>
                  {unit.subjects.map((subject) => (
                    <SubjectLink
                      key={'subject' + subject.id}
                      subject={subject}
                      path_id={params.path_id}
                    />
                  ))}
                </Fragment>
              ))}
            </>
          }
        </nav>
        <div className='w-2/3 ml-10 pt-10'>{children}</div>
      </div>
    </main>
  );
}
