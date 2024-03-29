import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return context.switchToHttp().getRequest()?.user;
});
