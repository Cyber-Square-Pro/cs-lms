import { z } from 'zod';

export const StaffRegistrationValidator = z.object({
   
    staff_name: z.string().min(1, 'Staff Name Required'),
    email: z.string().min(1, 'Email Required'),
    phone: z.string().min(1, 'Phone Required'),
    gender: z.string().min(1, 'Gender Required'),
    nationality: z.string().min(1, 'Nationality Required'),
    dob: z.string().min(1, 'DOB Required'),
    address: z.string().min(1, 'Address Required'),
    experience: z.number().min(1, 'Address Required'),
    joining_date:  z.string().min(1, 'Date Required'),
    role:  z.string().min(1, 'Address Required')

    });
 
export type TStaffRegistrationValidator = z.infer<typeof StaffRegistrationValidator>