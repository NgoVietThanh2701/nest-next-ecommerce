// DTO for returning product details in responses

import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the product',
  })
  id: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  name: string;

  @ApiProperty({
    example: 'This is a description of the product.',
    description: 'A detailed description of the product',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ example: 99.99, description: 'The price of the product' })
  price: number;

  @ApiProperty({ example: 100, description: 'The stock quantity of the product' })
  stock: number;

  @ApiProperty({ example: 'SKU123', description: 'The stock keeping unit of the product' })
  sku: string;

  @ApiProperty({
    example: 'https://example.com/product-image.jpg',
    description: 'The URL of the product image',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({ example: 'Electronics', description: 'The category of the product' })
  category: string | null;

  @ApiProperty({ example: true, description: 'Indicates if the product is active' })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date and time when the product was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00.000Z',
    description: 'The date and time when the product was last updated',
  })
  updatedAt: Date;
}
