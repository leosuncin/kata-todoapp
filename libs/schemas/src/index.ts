import { z } from 'zod';

export const Message = z.object({
  text: z.string(),
});

export type Message = z.infer<typeof Message>;
