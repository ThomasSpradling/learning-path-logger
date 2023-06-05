import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='flex w-full bg-teal-200 p-6 z-50'>
      <div className='text-lg font-bold'>
        <Link href='/home'>Logo</Link>
      </div>
      <div className='flex w-full justify-between items-center text-sm'>
        <div className=''>
          <Link
            href='/dashboard'
            className='ml-6 cursor-pointer inline-block text-teal-600 hover:text-teal-800'
          >
            Learning Plans
          </Link>
          <Link
            href='/schedule'
            className='ml-6 cursor-pointer inline-block text-teal-600 hover:text-teal-800'
          >
            Schedule
          </Link>
        </div>

        <div className=''>
          <Link
            href='/login'
            className='ml-6 cursor-pointer inline-block text-teal-600 hover:text-teal-800'
          >
            Login
          </Link>
          <Link
            href='/signup'
            className='ml-6 cursor-pointer inline-block text-teal-600 hover:text-teal-800'
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
