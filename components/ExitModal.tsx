'use client';

import { useRouter } from 'next/navigation';

export default function ExitModal() {
  const router = useRouter();
  return <button onClick={() => router.back()}>X</button>;
}
