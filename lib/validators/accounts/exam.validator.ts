import { z } from 'zod';

export const ExamValidator = z.object({

    exam_name: z.string().min(1, 'Title Required'),
    start_date: z.string().min(1, 'Message Required'),
    end_date: z.string().min(1, 'Message Required'),
    exam_time: z.string().min(1, 'Message Required'),
    exam_mark: z.string().min(1, 'Message Required'),
    min_grade: z.string().min(1, 'Message Required'),
    max_grade: z.string().min(1, 'Message Required'),

    
    });
 
export type TExamValidator = z.infer<typeof ExamValidator>