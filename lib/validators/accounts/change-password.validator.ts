import { z } from 'zod';

export const ChangePasswordValidator = z.object({

    old_password: z.string().min(1, 'Old Password Required'),
    new_password: z.string().min(1, 'New Password Required'),
    confirm_password: z.string().min(1, 'Confirm Password Required'),
    
    });
 
export type TChangePasswordValidator = z.infer<typeof ChangePasswordValidator>