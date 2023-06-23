'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchemaType, loginSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

export default function LoginForm({ cb }: { cb: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const signInWithCredentials: SubmitHandler<LoginSchemaType> = async (
    data
  ) => {
    try {
      await signIn('credentials', {
        username: data.username,
        password: data.password,
        // redirect: true,
        // callbackUrl: cb,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='bg-white w-4/12 p-10 rounded-lg mx-auto'>
      <h2 className='text-center mb-6 font-bold text-4xl'>Login</h2>
      <h3 className='text-center text-gray-400 mb-12'>Welcome back</h3>
      <div className='mx-auto w-full'>
        <form
          action='#'
          className='space-y-6'
          onSubmit={handleSubmit(signInWithCredentials)}
        >
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-900'
            >
              Username*
            </label>
            <div className='mt-2'>
              <input
                type='text'
                autoComplete='none'
                id='username'
                {...register('username')}
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
            {errors.username && (
              <span className='text-red-800 block mt-1'>
                {errors.username?.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900'
            >
              Password*
            </label>
            <div className='mt-2'>
              <input
                type='password'
                id='password'
                {...register('password')}
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
            {errors.password && (
              <span className='text-red-800 block mt-1'>
                {errors.password?.message}
              </span>
            )}
          </div>

          {/* Remember Me + Forgot Password block */}

          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <input
                className='mr-2 w-4 h-4 cursor-pointer'
                type='checkbox'
                name='remember'
              />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <a
              href=''
              className='text-teal-600 hover:text-black cursor-not-allowed'
            >
              Forgot Password?
            </a>
          </div>

          <div>
            <button
              type='submit'
              className='flex justify-center items-center w-full py-1.5 px-3 rounded-md bg-black text-white'
              disabled={isSubmitting}
            >
              Login {isSubmitting && <Loader2 className='ml-2 animate-spin' />}
            </button>
          </div>
        </form>

        {/* OAuth */}

        <div className="flex flex-row items-center mt-6 before:content-[''] before:flex-grow before:border-b before:border-gray-300 after:content-[''] after:flex-grow after:border-b after:border-gray-300">
          <span className='px-4'>Or continue with</span>
        </div>

        <div className='flex flex-row justify-between w-full mt-10 gap-6'>
          <button className='flex items-center justify-center flex-grow bg-gray-200 py-1.5 rounded-md gap-4 cursor-not-allowed'>
            <Icons.google />
            Google
          </button>
          <button className='flex items-center justify-center flex-grow bg-gray-800 py-1.5 rounded-md text-white gap-4 cursor-not-allowed'>
            <Icons.github />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
