import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MonitoringController } from './monitoring.controller';

@Module({
  imports: [TerminusModule],
  controllers: [MonitoringController],
})
export class MonitoringModule {}
