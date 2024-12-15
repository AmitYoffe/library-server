import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const IsAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user || !user.isAdmin) {
    throw new ForbiddenException('Admin access required');
  }

  return true;
});

// wakanda - admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiV2FrYW5kYSBTb2xkaWVyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM0MjQ4MjQ4LCJleHAiOjE3MzUyODUwNDh9.E6kmvQ7jN6P0VaabijTSfyPXBvfF3snkNdsC-ExwVV4
// testuser- isnt admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiVGVzdFVzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzQwMjcxLCJleHAiOjE3MzQzNDUwNzF9.baLLHGPKgenGLhbWAmPhEzQPB3vUEU0ErDes3Thz-L8

// todo: i need to extend the metadata of the route i will put this decorator on, but currently i am accessing the context of it instead of just adding to it.
// This will let me add the decorator to the route, not the method.
