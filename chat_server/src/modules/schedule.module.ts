import { Module } from '@nestjs/common';
import { ScheduleController } from '../controllers/schedule.controller';
import { ScheduleService } from '../services/schedule.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule {}