import { Module } from '@nestjs/common';
import { MessagesGateway } from '../gateways/message.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from 'src/services/message.service';

@Module({
  providers: [MessagesGateway, MessageService, PrismaService],
})
export class MessagesModule {}