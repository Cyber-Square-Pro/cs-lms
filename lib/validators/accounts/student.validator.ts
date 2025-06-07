import { z } from 'zod';

export const StudentValidator = z.object({
  student_name: z.string().min(1, 'Student name is required'),
  father_name: z.string().min(1, 'Father name is required'),
  admission_no:z.string().min(1, 'Admission No is required'),
  mother_name: z.string().min(1, 'Mother name is required'),
  joining_date: z.string().min(1, 'Mother name is required'),
  phone_no: z.string().min(1, 'Mother name is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  gender:z.string().min(1, 'Gender is required'),
  dob: z.string().min(1, 'Date of birth is required'), 
  address: z.string().min(1, 'Address is required'),
});

export type TStudentValidator = z.infer<typeof StudentValidator>;
