import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { FriendService } from '../services/friend.service';
import {
    Prisma,
    Friend,
    Friend as FriendModel /*, Post as PostModel */,
} from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Friend')
@Controller()
export class FriendController {
    constructor(
        private readonly friendService: FriendService,
    ) { }

    @ApiOperation({ summary: 'Выборка группы профиля с заданым user_id' })
    @Get('/friendsByMe/:user_id')
    async getAllFriendsByMe(@Param('user_id') user_id) {
        return await this.friendService.getAllByMe(Number(user_id));
    }


    @ApiOperation({ summary: 'Выборка группы профиля с заданым user_id' })
    @Get('/friendsForMe/:user_id')
    async getAllFriendsForMe(@Param('user_id') user_id) {
        return await this.friendService.getAllForMe(Number(user_id));
    }


    @ApiOperation({ summary: 'Выборка группы профиля с заданым user_id' })
    @Get('/friendsAll/:me_id')
    async getAllFriends(@Param('me_id') me_id) {
        return await this.friendService.getAllFriends(Number(me_id));
    }
    

    @ApiOperation({ summary: 'Выборка группы профиля с заданым user_id' })
    @Get('/friended/:me_id')
    async getFriend(@Param('me_id') data) {
        const me_id = data.split('=')[0];
        const friend_id = data.split('=')[1];
        return await this.friendService.get(Number(me_id), Number(friend_id));
    }
    

	@ApiOperation({ summary: 'Выборка группы профиля с заданым user_id' })
    @Post('/')
    async subscribe(@Body() postData) {
        return await this.friendService.subscribe(postData.me_id, postData.friend_id);
    }


    @Delete('/')
    async unsubscribe(@Body() postData) {
        return await this.friendService.unsubscribe(postData.me_id, postData.friend_id);
    }
    
}