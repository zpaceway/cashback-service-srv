import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { OrdersModule } from './orders/orders.module';
import { ApiModule } from './api/api.module';
import { DatabasesModule } from './databases/databases.module';
import { LoggerModule } from './logger/logger.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    OrdersModule,
    ApiModule,
    DatabasesModule,
    LoggerModule,
    MonitoringModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
