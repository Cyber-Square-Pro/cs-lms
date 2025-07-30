import { z } from 'zod';

export const NotificationsValidator = z.object({

    title: z.string().min(1, 'Title Required'),
    message: z.string().min(1, 'Message Required'),
    
    });
 
export type TNotificationsValidator = z.infer<typeof NotificationsValidator>