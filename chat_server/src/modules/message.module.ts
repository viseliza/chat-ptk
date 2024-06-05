import { Module } from '@nestjs/common';
import { MessagesGateway } from '../gateways/message.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from 'src/services/message.service';
import { MessageController } from 'src/controllers/message.controller';

@Module({
  controllers: [MessageController],
  providers: [MessagesGateway, MessageService, PrismaService],
})
export class MessagesModule {}