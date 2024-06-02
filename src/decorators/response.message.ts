import { SetMetadata } from '@nestjs/common';

export const MESSAGE_KEY = 'message';

export const Message = (message: string) => SetMetadata(MESSAGE_KEY, message);
