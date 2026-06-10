// DTO for querying categories with pagination and filtering

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryCategoryDto {
  @ApiProperty({ example: true, description: 'Filter by active status' })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined; // Return undefined if the value is not a valid boolean
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean; // Optional filter to get only active/inactive categories

  @ApiProperty({
    example: 'electronics',
    description: 'Search term to filter categories by name or description',
  })
  @IsOptional()
  @IsString()
  search?: string; // Optional search term to filter categories by name or description

  @ApiProperty({
    example: 10,
    description: 'Number of categories to return per page',
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page = 1; // Default page number

  @ApiProperty({
    example: 10,
    description: 'Number of categories to return per page',
    default: 10,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit = 10; // Default number of categories per page
}
