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
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateCategoyDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { UpdateCategoyDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoyDto })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCategoryDto: CreateCategoyDto): Promise<CategoryResponseDto> {
    return await this.categoryService.create(createCategoryDto);
  }

  // Get all categories
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(CategoryResponseDto) },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 10 },
          },
        },
      },
    },
  })
  async findAll(@Query() queryDto: QueryCategoryDto) {
    return await this.categoryService.findAll(queryDto);
  }

  // Get category by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully.',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    return await this.categoryService.findOne(id);
  }

  // Get category by slug (optional, can be implemented later)
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get category by slug' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully.',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findBySlug(@Param('slug') slug: string): Promise<CategoryResponseDto> {
    return await this.categoryService.findBySlug(slug);
  }

  // Update category
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update category (Admin only)' })
  @ApiBody({ type: UpdateCategoyDto })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully.',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiResponse({ status: 409, description: 'Conflict. Slug already exists.' })
  async update(
    @Param('id') id: string,
    updateCategoryDto: UpdateCategoyDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  // Delete category (Admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete category (Admin only)' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Cannot delete category with associated products.',
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.categoryService.remove(id);
  }
}
