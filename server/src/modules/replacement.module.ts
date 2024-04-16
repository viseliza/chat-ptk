import { Module } from '@nestjs/common';
import { ReplacementController } from '../controllers/replacement.controller';
import { ReplacementService } from '../services/replacement.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReplacementController],
  providers: [ReplacementService, PrismaService],
})
export class ReplacementModule {}