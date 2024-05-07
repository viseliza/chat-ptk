import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
		const user: User = await this.prisma.user.findFirst({ where });

		return user;
	}

	create(data: Prisma.UserCreateInput): Promise<User> {		
		const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
		const password = bcrypt.hashSync(data.password, salt);
		return this.prisma.user.create({
			data: {
				login: data.login,
				password
			},
		});
	}

	async update(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		const { data, where } = params;
		return this.prisma.user.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
		return this.prisma.user.delete({
			where,
		});
	}
}