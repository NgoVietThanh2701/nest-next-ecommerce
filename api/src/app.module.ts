import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { PrismaModule } from '@prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
