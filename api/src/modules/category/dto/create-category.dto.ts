// DTO for creating a new category
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoyDto {
  @ApiProperty({ example: 'Electronics', description: 'The name of the category', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'All kinds of electronic devices and gadgets',
    description: 'A brief description of the category',
    required: false,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    example: 'electronics',
    description: 'A URL-friendly slug for the category',
    required: false,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  slug?: string;

  @ApiProperty({
    example: 'https://example.com/images/electronics.jpg',
    description: 'URL of the category image',
    required: false,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  imageUrl?: string; // Optional field for category image URL

  @ApiProperty({
    example: true,
    description: 'Indicates if the category is active',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean; // Optional field to indicate if the category is active
}
