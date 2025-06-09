import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { BusinessHoursModule } from './business-hours/business-hours.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeHoursModule } from './employee-hours/employee-hours.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TransactionModule } from './transaction/transaction.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import typeormConfig from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config = configService.get<TypeOrmModuleOptions>('typeorm');
        if (!config) {
          throw new Error('TypeORM configuration is undefined');
        }
        return config;
      },
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3h' },
      }),
    }),
    UsersModule,
    BusinessModule,
    AddressModule,
    CategoryModule,
    BusinessHoursModule,
    EmployeeModule,
    EmployeeHoursModule,
    AppointmentModule,
    SubscriptionModule,
    TransactionModule,
    ServiceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
