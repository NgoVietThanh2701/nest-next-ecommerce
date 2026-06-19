import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaymentResponseDto {
  @ApiProperty({ description: 'The unique identifier for the payment.' })
  id: string;

  @ApiProperty({ description: 'The status of the payment (e.g., succeeded, failed).' })
  orderId: string;

  @ApiProperty({
    description: 'The amount of the payment in the smallest currency unit (e.g., cents).',
  })
  amount: number;

  @ApiProperty({ example: 'user-345' })
  userId: string;

  @ApiProperty({ description: 'The currency of the payment (e.g., USD, EUR).' })
  currency: string;

  @ApiProperty({
    description: 'The status of the payment (e.g., succeeded, failed).',
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELED'],
  })
  status: string;
  @ApiProperty({
    description: 'The payment method used for the transaction (e.g., credit card, PayPal).',
    nullable: true,
  })
  paymentMethod: string | null;

  @ApiProperty({
    description: 'The unique identifier for the transaction associated with the payment.',
    nullable: true,
  })
  transactionId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaymentApiResponseDto {
  @ApiProperty({ description: 'Indicates whether the payment was successful.' })
  success: boolean;

  @ApiProperty({
    type: PaymentResponseDto,
  })
  data: PaymentResponseDto;

  @ApiProperty({
    description: 'Payment retrieved successfully.',
    required: false,
  })
  @IsOptional()
  message?: string;
}

export class CreatePaymentIntentResponse {
  @ApiProperty({ description: 'The unique identifier for the payment intent.' })
  clientSecret: string;

  @ApiProperty({ description: 'The unique identifier for the payment.' })
  paymentId: string;
}

export class CreatePaymentIntentApiResponseDto {
  @ApiProperty({ description: 'Indicates whether the payment was successful.' })
  success: boolean;

  @ApiProperty({
    type: CreatePaymentIntentResponse,
  })
  data: CreatePaymentIntentResponse;

  @ApiProperty({
    description: 'Payment intent created successfully.',
    required: false,
  })
  @IsOptional()
  message?: string;
}
