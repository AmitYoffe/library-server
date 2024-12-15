import { SetMetadata } from '@nestjs/common';

export const IsAdmin = () => SetMetadata("isAdmin", true);

// wakanda - admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiV2FrYW5kYSBTb2xkaWVyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM0MjQ4MjQ4LCJleHAiOjE3MzUyODUwNDh9.E6kmvQ7jN6P0VaabijTSfyPXBvfF3snkNdsC-ExwVV4
// testuser- isnt admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiVGVzdFVzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMzNzQwMjcxLCJleHAiOjE3MzQzNDUwNzF9.baLLHGPKgenGLhbWAmPhEzQPB3vUEU0ErDes3Thz-L8
