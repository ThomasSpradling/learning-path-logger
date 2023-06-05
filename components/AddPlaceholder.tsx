import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function AddPlaceholder() {
  return (
    <Link href='/create-path'>
      <div
        className={
          'rounded-xl relative h-36 flex flex-col transition-all border-4 border-orange-300 border-dashed items-center justify-center text-orange-300 text-4xl hover:bg-white'
        }
      >
        <FaPlus />
      </div>
    </Link>
  );
}
