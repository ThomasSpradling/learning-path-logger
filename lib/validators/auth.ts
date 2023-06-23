import { z } from 'zod';

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required!')
      .max(100, 'Username cannot be longer than 100 character!'),
    email: z.string().email('Invalid email').min(1, 'Email is required!'),
    password: z.string().min(1, 'Password is required!'),
    confirmPassword: z.string().min(1, 'Password confirmation is required!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required!'),
  password: z.string().min(1, 'Passowrd is required!'),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
