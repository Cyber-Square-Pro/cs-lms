import { z } from 'zod';

export const NotesValidator = z.object({
    title: z.string().min(1, 'Title Required'),
    description: z.string().min(1, 'Description Required'),
    subject: z.string().min(1, 'Subject Required'),
    grade: z.string().min(1, 'Grade Required'),
    division: z.string().min(1, 'Division Required'),
    file: z
    .any()
    .refine((file) => file instanceof File, 'File is required')
    .refine((file) => file?.size <= 100 * 1024 * 1024, 'File size must be <= 100MB')
    .refine(
      (file) =>
        [
          'application/pdf',
          'video/mp4',
          'video/webm',
          'video/ogg',
        ].includes(file?.type),
      'Only PDF or video files (MP4, WebM, OGG) are allowed'
    ),
    });
 
export type TNotesValidator = z.infer<typeof NotesValidator>
