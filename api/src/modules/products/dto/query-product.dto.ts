// DTO for querying products with pagination and filtering

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryProductDto {
  @ApiProperty({ example: 'Electronics', description: 'Filter by category', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: true, description: 'Filter by active status', required: false })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 'headphone', description: 'Search by product name', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: 1, description: 'Page number for pagination', minimum: 1, default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiProperty({ example: 10, description: 'Number of items for page', minimum: 1, default: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit: number = 10;
}
