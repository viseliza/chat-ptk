import { Module } from '@nestjs/common';
import { RoomController } from 'src/controllers/room.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from 'src/services/room.service';

@Module({
    controllers: [RoomController],
    providers: [RoomService, PrismaService],
})
export class RoomModule {}