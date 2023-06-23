'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      className='ml-6 cursor-pointer inline-block text-englishViolet hover:text-raisinBlack'
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
