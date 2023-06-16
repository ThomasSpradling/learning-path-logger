'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

export default function NavBar() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className='flex w-full bg-thisle p-6 z-20 text-raisinBlack'>
      <div className='text-lg font-bold'>
        <Link href='/home'>Logo</Link>
      </div>
      <div className='flex w-full justify-between items-center text-sm'>
        <div className=''>
          <Link
            href='/dashboard'
            className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
          >
            Learning Plans
          </Link>
          <Link
            href='/schedule'
            className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
          >
            Schedule
          </Link>
        </div>

        {status === 'authenticated' ? (
          <div>
            <button
              className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <div className='ml-6 cursor-pointer text-englishViolet hover:text-raisinBlack inline-flex items-center gap-5'>
              <span>{session.user?.email}</span>
              <FaUser className='text-xl' />
            </div>
          </div>
        ) : (
          <div>
            <Link
              href='/login'
              className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
            >
              Login
            </Link>
            <Link
              href='/signup'
              className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
