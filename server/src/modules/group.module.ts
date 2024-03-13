import { Module } from '@nestjs/common';
import { GroupController } from '../controllers/group.controller';
import { GroupService } from '../services/group.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, PrismaService],
})
export class GroupModule {}