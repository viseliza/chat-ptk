import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room, Prisma, Message } from '@prisma/client';

@Injectable()
export class RoomService {
	constructor(private prisma: PrismaService) { }

	async create(room_name: string) {
		const profileFirst = await this.prisma.profile.findFirst({
			where: {
				user: {
					login: room_name.split('_')[0]
				}
			}
		});
		const profileSecond = await this.prisma.profile.findFirst({
			where: {
				user: {
					login: room_name.split('_')[1]
				}
			}
		});

		return this.prisma.room.create({
			data: {
				name: room_name,
				profiles: {
					connect: [{
							user_id: profileFirst.user_id
						}, {
							user_id: profileSecond.user_id
						}
					]
				}
			}
		})
	}

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
		let room = await this.get({ name: data });

		if (!room && data.split('_').length > 1) {
			room = await this.create(data);
		}
		
		return await this.prisma.room.findMany({
			include: {
				profiles: { 
					select: {
						first_name: true,
						last_name: true,
						father_name: true,
						user: {
							select: {
								id: true,
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
				name: room.name
			}
		})
	}
}