import { Module } from '@nestjs/common';
import { FriendController } from '../controllers/friend.controller';
import { FriendService } from '../services/friend.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FriendController],
  providers: [FriendService, PrismaService],
})
export class FriendModule {}