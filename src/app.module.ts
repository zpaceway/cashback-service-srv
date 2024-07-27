import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { OrdersModule } from './orders/orders.module';
import { ApiModule } from './api/api.module';
import { DatabasesModule } from './databases/databases.module';
import { LoggingModule } from './logging/logging.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    OrdersModule,
    ApiModule,
    DatabasesModule,
    LoggingModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
