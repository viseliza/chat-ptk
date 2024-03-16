import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from 'src/services/profile.service';
import { GroupService } from 'src/services/group.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ProfileService, GroupService, PrismaService],
})
export class UserModule {}