import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { ScheduleService } from '../services/schedule.service';
import {
    Prisma,
    Schedule,
    Schedule as ScheduleModel /*, Post as PostModel */,
} from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Schedule')
@Controller()
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
    ) { }

	@ApiOperation({ summary: 'Выборка расписания по названию группы' })
    @Get('/:group_name')
    async get(@Param('group_name') group_name: string) {
        return this.scheduleService.get( group_name );
    }

    @ApiOperation({ summary: 'Обновление расписания' })
    @Post('/')
    async create(@Body() data) {
        return this.scheduleService.createOrUpdate( data );
    }

    
	// @ApiOperation({ summary: 'Обновление данных группы по названию' })
    // @Patch('/:name')
    // update(
    //     @Param('name') name: string,
    //     @Body() updateLinkDto: Prisma.ScheduleUpdateInput,
    // ) {
    //     return this.scheduleService.update({
    //         where: { name },
    //         data: updateLinkDto,
    //     });
    // }

	// @ApiOperation({ summary: 'Удаление записи группы из таблицы' })
    // @Delete('/:name')
    // delete(@Param('name') name: string) {
    //     return this.scheduleService.delete({ name });
    // }
}