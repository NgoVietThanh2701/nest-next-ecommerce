//  DTO for category update

import { PartialType } from '@nestjs/swagger';
import { CreateCategoyDto } from './create-category.dto';

export class UpdateCategoyDto extends PartialType(CreateCategoyDto) {}
