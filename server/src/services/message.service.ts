import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create.message.dto';
import { UpdateMessageDto } from '../dto/update.message.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  clientToUsers = {};

  identify(name: string, clientId: string) {
    this.clientToUsers[clientId] = name;

    return Object.values(this.clientToUsers);
  }

  async create(message: CreateMessageDto) {
    return await this.prisma.message.create({
      data: {
        user_id: Number(message.name),
        text: message.text,
        time: message.time,
        room_id: message.room_id
      }
    });
  }

  async findAll(data) {
    const take = data.row + 100;
    const response = await this.prisma.message.findMany({ 
			where: { 
			  room_id: data.id
			},
			skip: data.row,
      take
		});
	  
		return response;
  }

  update(id: number, message: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}