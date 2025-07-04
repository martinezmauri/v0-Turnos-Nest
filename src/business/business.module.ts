import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { BusinessRepository } from './business.repository';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Category, User])],
  controllers: [BusinessController],
  providers: [BusinessService, BusinessRepository],
  exports: [BusinessService, BusinessRepository],
})
export class BusinessModule {}
