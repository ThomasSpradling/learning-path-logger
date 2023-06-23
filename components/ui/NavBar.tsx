import { getAuthSession } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import SignOutButton from './SignoutButton';

export default async function NavBar() {
  const session = await getAuthSession();

  return (
    <nav className='flex w-full bg-thisle p-6 z-20 text-raisinBlack'>
      <div className='text-lg font-bold'>
        <Link href='/home'>Path.ly</Link>
      </div>
      <div className='flex w-full justify-between items-center text-sm'>
        <div className=''>
          <Link
            href='/dashboard'
            className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
          >
            Learning Plans
          </Link>
          {/* <Link
            href='/schedule'
            className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
          >
            Schedule
          </Link> */}
        </div>

        {session?.user ? (
          <div>
            <SignOutButton />
            <div className='ml-6 cursor-pointer text-englishViolet hover:text-raisinBlack inline-flex items-center gap-5'>
              {/* @ts-ignore */}
              <span>{session.user.username}</span>
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
