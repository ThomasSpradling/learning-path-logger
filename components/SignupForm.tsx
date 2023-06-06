'use client';

import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState<{
    email: string;
    username: string;
    password: string;
    remember: boolean;
  }>({
    email: '',
    username: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='bg-white w-4/12 p-10 rounded-lg mx-auto'>
      <h2 className='text-center mb-6 font-bold text-2xl'>Sign up</h2>
      <div className='mx-auto w-full'>
        <form action='#' className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900'
            >
              Email Address
            </label>
            <div className='mt-2'>
              <input
                type='email'
                name='email'
                autoComplete='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-900'
            >
              Username
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='username'
                autoComplete='none'
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <div className='mt-2'>
              <input
                type='password'
                name='password'
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
          </div>

          <div className='flex items-center'>
            <input
              className='mr-2 w-4 h-4 cursor-pointer'
              checked={formData.remember}
              onChange={(e) =>
                setFormData({ ...formData, remember: e.target.checked })
              }
              type='checkbox'
              name='remember'
            />
            <label htmlFor='remember'>Remember me</label>
          </div>

          <div>
            <button
              type='submit'
              className='flex justify-center items-center w-full py-1.5 px-3 rounded-md bg-teal-600 text-white hover:bg-teal-700'
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="flex flex-row items-center mt-6 before:content-[''] before:flex-grow before:border-b before:border-gray-300 after:content-[''] after:flex-grow after:border-b after:border-gray-300">
          <span className='px-4'>Or continue with</span>
        </div>

        <div className='flex flex-row justify-between w-full mt-10 gap-6'>
          <button className='flex items-center justify-center flex-grow bg-gray-200 py-1.5 rounded-md gap-4'>
            <svg
              className='w-5 h-5'
              xmlns='http://www.w3.org/2000/svg'
              width='705.6'
              height='720'
              viewBox='0 0 186.69 190.5'
            >
              <g transform='translate(1184.583 765.171)'>
                <path
                  clipPath='none'
                  mask='none'
                  d='M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z'
                  fill='#4285f4'
                />
                <path
                  clipPath='none'
                  mask='none'
                  d='M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z'
                  fill='#34a853'
                />
                <path
                  clipPath='none'
                  mask='none'
                  d='M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z'
                  fill='#fbbc05'
                />
                <path
                  d='M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z'
                  fill='#ea4335'
                  clipPath='none'
                  mask='none'
                />
              </g>
            </svg>
            Google
          </button>
          <button className='flex items-center justify-center flex-grow bg-gray-800 py-1.5 rounded-md text-white gap-4'>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                clipRule='evenodd'
              ></path>
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
