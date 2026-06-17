import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  OrderApiResponseDto,
  OrderResponseDto,
  PaginatedOrderResponseDto,
} from './dto/order-response.dto';
import { GetUser } from '@common/decorators/get-user.decorator';
import { ModerateThrottle, RelaxedThrottle } from '@common/decorators/custom-throttler.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Create orders
  @Post()
  @ModerateThrottle()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({ description: 'Order created successfully', type: OrderApiResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid order data' })
  @ApiNotFoundResponse({ description: 'Cart not found or empty' })
  @ApiTooManyRequestsResponse({ description: 'Too many requests, please try again later' })
  async create(@Body() createOrderDto: CreateOrderDto, @GetUser('id') userId: string) {
    return await this.ordersService.create(userId, createOrderDto);
  }

  //  ADMIN: Get all orders
  @Get('admin/all')
  @Roles(Role.ADMIN)
  @RelaxedThrottle()
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiResponse({
    description: 'List of all orders',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(OrderResponseDto),
          },
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
  })
  @ApiForbiddenResponse({ description: 'Admin access required' })
  async findAllForAdmin(@Query() query: QueryOrderDto) {
    return await this.ordersService.findAllForAdmin(query);
  }

  // User Get own orders
  @Get()
  @RelaxedThrottle()
  @ApiOperation({ summary: "Get user's own orders" })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ description: "List of user's orders", type: PaginatedOrderResponseDto })
  async findAll(@Query() query: QueryOrderDto, @GetUser('id') userId: string) {
    return await this.ordersService.findAll(userId, query);
  }

  // ADMIN: Get order by ID
  @Get('admin/:id')
  @Roles(Role.ADMIN)
  @RelaxedThrottle()
  @ApiOperation({ summary: 'Get order by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiOkResponse({ description: 'Order details', type: OrderApiResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @ApiForbiddenResponse({ description: 'Admin access required' })
  async findOneForAdmin(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  // User: Get own order by ID
  @Get(':id')
  @RelaxedThrottle()
  @ApiOperation({ summary: 'Get own order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiOkResponse({ description: 'Order details', type: OrderApiResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @ApiNotFoundResponse({ description: 'Order not found or does not belong to user' })
  async findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.ordersService.findOne(id, userId);
  }

  // ADMIN: Update order status (e.g., mark as shipped, delivered, etc.)
  @Patch('admin/:id')
  @Roles(Role.ADMIN)
  @ModerateThrottle()
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ description: 'Order status updated successfully', type: OrderApiResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @ApiForbiddenResponse({ description: 'Admin access required' })
  async updateAdmin(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.update(id, updateOrderDto);
  }

  // User: update own order
  @Patch(':id')
  @ModerateThrottle()
  @ApiOperation({ summary: 'Update own order (e.g., add tracking number, notes)' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ description: 'Order updated successfully' })
  @ApiNotFoundResponse({ description: 'Order not found or does not belong to user' })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @GetUser('id') userId: string,
  ) {
    return await this.ordersService.update(id, updateOrderDto, userId);
  }

  // ADMIN: cancel an order
  @Delete('admin/:id')
  @Roles(Role.ADMIN)
  @ModerateThrottle()
  @ApiOperation({ summary: 'Cancel an order (Admin only)' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiOkResponse({ description: 'Order cancelled successfully', type: OrderApiResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async cancelAdmin(@Param('id') id: string) {
    return await this.ordersService.cancel(id);
  }

  // User: cancel own order
  @Delete(':id')
  @ModerateThrottle()
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  @ApiOkResponse({ description: 'Order cancelled successfully', type: OrderApiResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async cancel(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.ordersService.cancel(id, userId);
  }
}
