import { z } from 'zod';

export const SignInValidator = z.object({

    email: z.string().min(1, 'Email Required'),
    password: z.string().min(1, 'Password Required'),
    
     
    });
 
export type TSignInValidator = z.infer<typeof SignInValidator>