import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create.message.dto';
import { UpdateMessageDto } from '../dto/update.message.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) { }

	clientToUsers = {};

	updateMessage(message: UpdateMessageDto) {
		return this.prisma.message.update({
			where: {
				id: message.id
			}, data: {
				is_read: message.is_read
			}
		})
	}

	identify(name: string, clientId: string) {
		this.clientToUsers[clientId] = name;
	
		return Object.values(this.clientToUsers);
	}

	getClientName(clientId: string) {
		return this.clientToUsers[clientId];
	}

	async create(message: CreateMessageDto) {
		return await this.prisma.message.create({
			data: {
				user_id: Number(message.user_id),
				text: message.text,
				time: message.time,
				room_id: message.room_id,
				is_read: message.is_read
			}
		});
	}

	async findAll(data) {
		const take = data.row + 100;
		
		const response = await this.prisma.message.findMany({
			where: {
				room_id: data.room_id
			},
			orderBy: {
				id: 'desc'
			},
			skip: data.row,
			take
		});
		
		return response.reverse();
	}

	async update(id: number, message: any) {
		return await this.prisma.message.update({
			where: {
				id
			}, data: {
				text: message.text,
				is_read: message.is_read,
				reactions: message.reactions
			}
		})
	}

	async getAllReactions(id: number) {
		return await this.prisma.message.findFirst({
			where: {
				id
			}, select: {
				reactions: true
			}
		})
	}

	async delete(id: number) {
		return await this.prisma.message.delete({
			where: {
				id
			}
		})
	}
}