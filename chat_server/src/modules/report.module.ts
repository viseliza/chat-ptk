import { Module } from '@nestjs/common';
import { ReportController } from '../controllers/report.controller';
import { ReplacementService } from 'src/services/replacement.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleService } from 'src/services/schedule.service';
import { ReportService } from 'src/services/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ReplacementService, ScheduleService, PrismaService],
})
export class ReportModule {}