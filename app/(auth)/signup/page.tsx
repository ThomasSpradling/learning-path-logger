import SignupForm from '@/components/SignupForm';

export default function Login() {
  return (
    <main className='flex flex-grow items-center justify-center'>
      <SignupForm cb={process.env.NEXTAUTH_URL as string} />
    </main>
  );
}
