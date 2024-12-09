import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const IsAdmin = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
  
    if (!user || !user.isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  },
);

// wakanda - admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiV2FrYW5kYSBTb2xkaWVyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzMzNzQwMjA1LCJleHAiOjE3MzQzNDUwMDV9.s4tX2dJkNthPdfCDLRxtD5jUuce11-b9w0DSvtIUd-o
// testuser- isnt admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiVGVzdFVzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzQwMjcxLCJleHAiOjE3MzQzNDUwNzF9.baLLHGPKgenGLhbWAmPhEzQPB3vUEU0ErDes3Thz-L8