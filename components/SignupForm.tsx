'use client';

import { useToast } from '@/hooks/useToast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchemaType, signupSchema } from '@/lib/validators/auth';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { Icons } from './Icons';

export default function Signup({ cb }: { cb: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const { toast } = useToast();

  const signupWithCredentials: SubmitHandler<SignupSchemaType> = async (
    data
  ) => {
    try {
      const res = await axios.post('/api/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    } catch (e) {
      console.log(e);
      if ((e as AxiosError).response?.status === 409) {
        toast({
          title: 'Error',
          description: (e as AxiosError).response?.data as string,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Error',
        description: 'A server error has occured',
        variant: 'destructive',
      });
    }

    try {
      await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: true,
        callbackUrl: cb,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'Your account was created, but we had trouble logging in. Please manually log in.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='bg-white w-4/12 p-10 rounded-lg mx-auto'>
      <h2 className='text-center mb-6 font-bold text-4xl'>Signup</h2>
      <h3 className='text-center text-gray-400 mb-12'>Welcome!</h3>
      <div className='mx-auto w-full'>
        <form
          action='#'
          className='space-y-6'
          onSubmit={handleSubmit(signupWithCredentials)}
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900'
            >
              Email Address*
            </label>
            <div className='mt-2'>
              <input
                type='text'
                id='email'
                autoComplete='email'
                {...register('email')}
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
            {errors.email && (
              <span className='text-red-800 block mt-1'>
                {errors.email?.message}
              </span>
            )}
          </div>
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
                id='username'
                autoComplete='none'
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

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900'
            >
              Confirm Password*
            </label>
            <div className='mt-2'>
              <input
                type='password'
                id='confirmPassword'
                {...register('confirmPassword')}
                className='block py-1.5 px-3 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'
              />
            </div>
            {errors.confirmPassword && (
              <span className='text-red-800 block mt-1'>
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>

          {/* Remember Me functionality */}

          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <input
                className='mr-2 w-4 h-4 cursor-pointer'
                type='checkbox'
                name='remember'
              />
              <label htmlFor='remember'>Remember me</label>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex justify-center items-center w-full py-1.5 px-3 rounded-md bg-black text-white'
            >
              Create Account{' '}
              {isSubmitting && <Loader2 className='ml-2 animate-spin' />}
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
