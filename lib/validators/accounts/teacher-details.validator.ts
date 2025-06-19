import { z } from 'zod';

export const TeacherDetailsValidator = z.object({
    staff_id: z.string().min(1, 'Qualification Required'),
    highest_qualification: z.string().min(1, 'Qualification Required'),
    board_or_university: z.string().min(1, 'Board/University Required'),
    designation: z.string().min(1, 'designation Required'),
    department: z.string().min(1, 'Department Required'),
    nationality: z.string().min(1, 'Nationality Required'),
    
    subjects_assigned: z.array(z.string()).min(1, 'At least one subject must be assigned'),

    });
 
export type TTtaffDetailsValidator = z.infer<typeof TeacherDetailsValidator>
