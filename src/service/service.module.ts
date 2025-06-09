import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Business } from 'src/business/entities/business.entity';
import { ServiceRepository } from './service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Business])],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService],
})
export class ServiceModule {}
