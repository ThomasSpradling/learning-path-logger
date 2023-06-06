import { FaPlus } from 'react-icons/fa';

type VariantTypes = {
  default: string;
  create: string;
  select: string;
  selectActive: string;
};

type VariantType = keyof VariantTypes;

const variants: VariantTypes = {
  default:
    'px-5 py-3 text-black rounded-lg text-center inline-flex items-center',
  create: 'pr-10 border border-black hover:bg-gray-300',
  select: 'px-10 py-2 bg-gray-300 hover:bg-teal-200 ml-6',
  selectActive: '',
};

variants.selectActive = `${variants.select} bg-teal-500 hover:bg-teal-500 text-white`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantType;
}

export function Button({ variant, className, children, ...props }: Props) {
  return (
    <button
      type='button'
      {...props}
      className={`${variants['default']} ${variants[variant]} ${className}`}
    >
      {variant === 'create' ? <FaPlus className={`inline w-4 h-4 mr-3`} /> : ''}
      {children}
    </button>
  );
}
