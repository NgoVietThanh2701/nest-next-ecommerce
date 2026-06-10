// DTO for changing user password

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The current password for the user',
    example: 'currentSecurePassword123!',
  })
  @IsString()
  @IsNotEmpty({ message: 'Current password is required' })
  currentPassword!: string;

  @ApiProperty({
    description: 'The new password for the user',
    example: 'newSecurePassword123!',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  newPassword!: string;
}
