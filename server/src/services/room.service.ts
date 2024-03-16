import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room, Prisma, Message } from '@prisma/client';

@Injectable()
export class RoomService {
	constructor(private prisma: PrismaService) { }

	async get(where: Prisma.RoomWhereInput): Promise<Room> {
		return await this.prisma.room.findFirst({ where });
	}

	async lastMessage(data: Prisma.RoomWhereInput) {
		return await this.prisma.room.findFirst({
			select: {
				messages: {
					orderBy: {
						id: "desc"
					},
					take: 1
				}
			},
			where: {
				name: data.name
			}
		});
	}

	async getRoomInfo(data) {
		return await this.prisma.room.findMany({
			include: {
				profiles: { 
					select: {
						first_name: true,
						last_name: true,
						father_name: true,
						user: {
							select: {
								login: true
							}
						}
					}
				},
				_count: {
					select: {
						profiles: true
					}
				}
			},
			where: {
				name: data.name
			}
		})
	}
}