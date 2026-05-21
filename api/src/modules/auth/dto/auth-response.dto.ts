import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

// DTO for response
export class AuthResponseDto {
  @ApiProperty({
    description: 'Access token for authenticated requests',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access tokens',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Authenticated user information',
    example: {
      id: '1234567890',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
    },
  })
  user!: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    role: Role;
  };
}
