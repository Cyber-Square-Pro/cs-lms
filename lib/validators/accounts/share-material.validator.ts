import { z } from 'zod';

export const ShareMaterialValidator = z.object({

    cls: z.string().min(1, 'Grade Required'),
    division: z.string().min(1, 'Division Required'),
    });
 
export type TShareMaterialValidator = z.infer<typeof ShareMaterialValidator>
