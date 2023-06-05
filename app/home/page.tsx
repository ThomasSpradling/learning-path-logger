import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col flex-grow items-center justify-center relative bottom-10'>
      <h2 className='text-3xl font-bold'>Create a learning plan for</h2>
      <p className='text-3xl font-bold text-teal-500 mb-10'>geometry</p>
      <p className='text-md text-gray-600 mb-10'>
        Logo is an app used to encourage learning and blah blah
      </p>
      <Link
        href='/dashboard'
        className='rounded-lg bg-teal-700 px-4 py-3 text-white hover:text-teal-950 hover:bg-teal-200'
      >
        Get started
      </Link>
    </main>
  );
}
