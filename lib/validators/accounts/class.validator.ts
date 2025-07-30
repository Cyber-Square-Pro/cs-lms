import { z } from 'zod';

export const ClassValidator = z.object({
    cls: z.string().min(1, 'Class Required'),
    division: z.string().min(1, 'Division Required'),
    section: z.string().min(1, 'Section Required'),     
    });
 
export type TClassValidator = z.infer<typeof ClassValidator>