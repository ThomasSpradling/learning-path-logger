import { FaPlus } from 'react-icons/fa';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {};

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>({ className, variant, ...props }, ref) => {
//   return (
//     <button
//       className={`${buttonVariants(variant)} ${className}`}
//       ref={ref}
//     >
//       {...props}
//     </button>
//   )
// };

const variants: {
  [key: string]: string;
} = {
  default:
    'px-5 py-3 bg-teal-300 text-black rounded-lg text-center inline-flex items-center',
  create: 'pr-10 border border-black hover:bg-gray-300',
};

type VariantType = 'create' | 'normal';

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
