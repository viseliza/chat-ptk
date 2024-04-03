import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Profile, Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
	constructor(private prisma: PrismaService) { }

	async get(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
		return await this.prisma.profile.findUnique({
			where
		});
	}

	// used
	async getRoomsInfo(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
		const response = await this.prisma.profile.findFirst({
			where: {
				user_id: Number(where.user_id)
			},
			include: {
				room: {
					select: {
						profiles: {
							select: {
								user: true,
								first_name: true,
								last_name: true
							},
						},
						name: true,
						messages: {
							orderBy: {
								id: "desc"
							},
							take: 1
						}
					}
			}
		}});
		return response;
	}

	// used
	async getByLogin(data: string): Promise<Profile> {
		const response = await this.prisma.profile.findFirst({
			where: {
				user: {
					login: data
				}
			}, include: {
				group: true
			}
		});
		if (!response) throw new NotFoundException('Пользователь не найден!')
		return response;
	}


	async getProfilesFrinends(data) {
		return await this.prisma.profile.findMany({
			where: {
				user_id: {
					in: data
				}
			}, include: {
				group: {
					select: {
						name: true
					}
				},
				user: {
					select: {
						login: true
					}
				}
			}
		})
	}


	async getAllProfiles(): Promise<Profile[]> {
		return await this.prisma.profile.findMany({
			include: {
				group: {
					select: {
						name: true
					}
				},
				user: {
					select: {
						login: true
					}
				}
			}
		})
	}

	async create(data): Promise<Profile> {
		const group = await this.prisma.group.findFirst({
			where: {
				id: data.group_id
			}, select: {
				name: true
			}
		})

		return this.prisma.profile.create({
			data: {
				email: data.email,
				first_name: data.first_name,
				last_name: data.last_name,
				father_name: data.father_name,
				theme: data.theme,
				role: data.role,
				user_id: data.user_id,
				group_id: data.group_id,
				room: {
					connectOrCreate: {
						where: { name: group.name },
						create: { name: group.name }
					}
				}
			}
		});
	}

	async update(params: {
		where: Prisma.ProfileWhereUniqueInput;
		data: Prisma.ProfileUpdateInput;
	}): Promise<Profile> {
		const { data, where } = params;
		return this.prisma.profile.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
		return this.prisma.profile.delete({
			where,
		});
	}
}