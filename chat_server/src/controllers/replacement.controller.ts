import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { ReplacementService } from '../services/replacement.service';
import {
    Prisma,
    Replacement,
    Replacement as ReplacementModel /*, Post as PostModel */,
} from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Replacement')
@Controller()
export class ReplacementController {
    constructor(
        private readonly replacementService: ReplacementService,
    ) { }

	@ApiOperation({ summary: 'Выборка замены с заданым date' })
    @Get('/:date')
    async get(@Param('date') date: string) {
        return this.replacementService.get( date );
    }

    @ApiOperation({ summary: 'Создание записи замены на выбранную дату' })
    @Post('/')
    async create(@Body() data) {
        return this.replacementService.create( data );
    }

    
	// @ApiOperation({ summary: 'Обновление данных группы по названию' })
    // @Patch('/:name')
    // update(
    //     @Param('name') name: string,
    //     @Body() updateLinkDto: Prisma.ReplacementUpdateInput,
    // ) {
    //     return this.replacementService.update({
    //         where: { name },
    //         data: updateLinkDto,
    //     });
    // }

	// @ApiOperation({ summary: 'Удаление записи группы из таблицы' })
    // @Delete('/:name')
    // delete(@Param('name') name: string) {
    //     return this.replacementService.delete({ name });
    // }
}