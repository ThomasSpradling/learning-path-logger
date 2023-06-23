import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <main className='flex flex-grow items-center justify-center bg-white'>
      <LoginForm cb={process.env.NEXTAUTH_URL as string} />
    </main>
  );
}
