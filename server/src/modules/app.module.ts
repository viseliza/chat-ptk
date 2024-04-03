import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ProfileModule } from './profile.module';
import { GroupModule } from './group.module';
import { RoomModule } from './room.module';
import { MessagesModule } from './message.module';
import { FriendModule } from './friend.module';

@Module({
  imports: [UserModule, ProfileModule, GroupModule, RoomModule, MessagesModule, FriendModule]
})
export class AppModule {}
