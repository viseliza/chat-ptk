import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { RoomService } from '../services/room.service';
import {
    Prisma,
    Room,
    Room as RoomModel /*, Post as PostModel */,
} from '@prisma/client';

@Controller()
export class RoomController {
    constructor ( private readonly roomService: RoomService ) { }
    
    @Get('/:name')
    get(@Param('name') name: string) {
      return this.roomService.get({ name });
    }
    
    // Все сообщения из room
    @Get('/rooms/:name')
    async getLastMessage(@Param('name') name: string) {
        const message = await this.roomService.lastMessage({ name });
        return message.messages;
    }

    @Get('/getRoomInfo/:name')
    async getUsersFromRoom(@Param('name') name: string) {
        return await this.roomService.getRoomInfo(name);
    }

    // @Get('/roomLastMessage/:name')
    // async lastMessage(@Param('name') name: string) {
    //     console.log(await this.roomService.findMany({ orderBy: {id: 'desc'}, take: 1 }))
    // }
  
    // @Post('/auth')
    // create(
    //   @Body()
    //   data: Prisma.RoomCreateInput,
    // ): Promise<Room> {
    //   return this.roomService.create(data);
    // }
  
    // @Patch('/:login')
    // update(
    //   @Param('login') login: string,
    //   @Body() updateLinkDto: Prisma.RoomUpdateInput,
    // ) {
    //   return this.roomService.update({
    //     where: { login },
    //     data: updateLinkDto,
    //   });
    // }
  
    // @Delete('/:login')
    // delete(@Param('login') login: string) {
    //   return this.roomService.delete({ login });
    // }
}