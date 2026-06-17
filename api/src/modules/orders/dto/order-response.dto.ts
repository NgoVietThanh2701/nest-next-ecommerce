// DTO for order response

import { ApiProperty } from '@nestjs/swagger';

export class OrderApiResponseDto<T> {
  @ApiProperty({ description: 'Indicates if the order was created successfully' })
  success: boolean;

  @ApiProperty({ description: 'Returned data', type: Object })
  data: T;

  @ApiProperty({
    description: 'Optional message',
    required: false,
    nullable: true,
  })
  message?: string;
}

class OrderItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  shippingAddress: string;

  @ApiProperty({
    type: [OrderItemResponseDto],
  })
  items: OrderItemResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaginatedOrderResponseDto {
  @ApiProperty({
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  data: OrderResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
