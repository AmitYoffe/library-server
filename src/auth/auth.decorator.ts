import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const IsAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
  
    if (!user || !user.isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  },
);

// wakanda - admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiV2FrYW5kYSBTb2xkaWVyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzMzNDEyOTU4LCJleHAiOjE3MzM0NTYxNTh9._3ilUmJoxkEEw9ppSLYEzoteg5GxOUXT-oq0r8UY-XM
// testuser- isnt admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiVGVzdFVzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNDExMjc1LCJleHAiOjE3MzM0NTQ0NzV9.8dfWKIhkuskyfU0HgDymZRNBFgG3dUj5S04olqtE1Tg