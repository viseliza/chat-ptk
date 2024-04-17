import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ProfileModule } from './profile.module';
import { GroupModule } from './group.module';
import { RoomModule } from './room.module';
import { MessagesModule } from './message.module';
import { FriendModule } from './friend.module';
import { RouterModule, Routes } from '@nestjs/core';
import { ReplacementModule } from './replacement.module';
import { ScheduleModule } from './schedule.module';

const routes: Routes = [
	{
		path: 'api',
		children: [
			{ 'path': 'user', module: UserModule },
			{ 'path': 'profile', module: ProfileModule },
			{ 'path': 'group', module: GroupModule },
			{ 'path': 'room', module: RoomModule },
			{ 'path': 'messages', module: MessagesModule },
			{ 'path': 'friend', module: FriendModule },
			{ 'path': 'replacement', module: ReplacementModule },
			{ 'path': 'schedule', module: ScheduleModule },
		]
	}
]


@Module({
	imports: [
		UserModule, 
		ProfileModule,
		GroupModule, 
		RoomModule, 
		MessagesModule, 
		FriendModule,
		ReplacementModule,
		ScheduleModule,
		RouterModule.register(routes),
	]
})
export class AppModule { }
