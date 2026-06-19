import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  CreatePaymentIntentApiResponseDto,
  PaymentApiResponseDto,
} from './dto/payment-response.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { GetUser } from '@common/decorators/get-user.decorator';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiTags('payments')
@ApiBearerAuth('JWT-auth')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @ApiOperation({
    summary: 'Create a payment intent',
    description: 'Creates a payment intent for processing payments.',
  })
  @ApiCreatedResponse({
    description: 'Payment intent created successfully.',
    type: CreatePaymentIntentApiResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request data.' })
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
    @GetUser('id') userId: string,
  ) {
    return await this.paymentsService.createPaymentIntent(userId, createPaymentIntentDto);
  }

  // Confirm Payment Endpoint
  @Post('confirm')
  @ApiOperation({
    summary: 'Confirm a payment intent',
    description: 'Confirms a payment intent after successful payment processing.',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment confirmed successfully',
    type: PaymentApiResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request data.' })
  async confirmPayment(
    @Body() confirmPaymentDto: ConfirmPaymentDto,
    @GetUser('id') userId: string,
  ) {
    return await this.paymentsService.confirmPayment(userId, confirmPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiOkResponse({ description: 'Payments retrieved successfully', type: PaymentApiResponseDto })
  async findAll(@GetUser('id') userId: string) {
    return await this.paymentsService.findAll(userId);
  }

  //
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the payment to retrieve',
    example: 'payment_1234567890',
  })
  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiOkResponse({ description: 'Payment retrieved successfully', type: PaymentApiResponseDto })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  async findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.paymentsService.findOne(id, userId);
  }

  // Get payment by order ID
  @Get('order/:orderId')
  @ApiParam({
    name: 'orderId',
    description: 'The ID of the order to retrieve payment for',
    example: 'order_1234567890',
  })
  @ApiOperation({ summary: 'Get payment by order ID' })
  @ApiOkResponse({ description: 'Payment retrieved successfully', type: PaymentApiResponseDto })
  @ApiNotFoundResponse({ description: 'Payment not found for the given order ID' })
  async findByOrder(@Param('orderid') orderId: string, @GetUser('id') userId: string) {
    return await this.paymentsService.findByOrder(orderId, userId);
  }
}
