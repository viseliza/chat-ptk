import {
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Body,
	Delete,
	NotFoundException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Group, Prisma, Profile, User, User as UserModel } from '@prisma/client';
import { ProfileService } from 'src/services/profile.service';
import { ProfileEntity } from 'src/entities/profile.entity';
import { GroupService } from 'src/services/group.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { NewUserDTO } from 'src/dto/create.user.dto';


@ApiBearerAuth()
@ApiTags('User')
@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly profileService: ProfileService,
		private readonly groupService: GroupService,
	) { }

	@Get('/:login')
	@ApiOperation({ summary: 'Выборка пользователя из таблицы User по логину' })
	@ApiResponse({
		status: 200,
		description: 'The found record',
		type: NewUserDTO
	})
	get(@Param('login') login: string): Promise<UserEntity> {
		return this.userService.findOne({ login });
	}

	// Authorization
	@Post('/auth')
	@ApiOperation({ summary: 'Авторизация пользователя через аккаунт NovSU' })
  	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiTags('Authorization')
	async create (
		@Body() data
	): Promise<Profile> {
		const user = await this.userService.findOne({ login: data.login });

		let profile: ProfileEntity;
		let role = 'STUDENT';
		let group: Group;

		// Создание юзера и профиля
		if (!user) {
			// API NovSU for get the student's group number
			const response = await fetch(`https://people.novsu.ru/NovSUScheduleService/ScheduleProxy?uid=${data.login}`);
			const result = await response.text();
			const { first_name, last_name, father_name } = data;
			
			if (result == 'LDAP_ERROR: [LDAP: error code 32 - No Such Object]')
				throw new NotFoundException('Что-то пошло не так...');

			const params = new URLSearchParams(result.split('src=')[1]);
			const groupName = params.get('name');

			// Creating new NovSU user
			const newUser = await this.userService.create(data);
			
			if (!groupName) {
				role = 'TEACHER'

				profile = await this.profileService.create({
					data: { 
						first_name,
						last_name,
						father_name,
						role,
						user_id: newUser.id
					}
				})
			} else {
				// Selecting group from the database by group number
				group = await this.groupService.get({
					name: groupName
				});

				profile = await this.profileService.create({
					first_name,
					last_name,
					father_name,
					role,
					group_id: group.id,
					user_id: newUser.id
				})
			}
		} else {
			profile = await this.profileService.getByLogin(data.login);
		}

		return profile;
	}


	@ApiOperation({ summary: 'Обновление данных пользователя из таблицы User по логину' })
	@Patch('/:login')
	update(
		@Param('login') login: string,
		@Body() updateLinkDto: Prisma.UserUpdateInput,
	) {
		return this.userService.update({
			where: { login },
			data: updateLinkDto,
		});
	}

}