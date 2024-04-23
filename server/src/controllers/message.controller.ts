import {
    Controller,
    Param,
    Patch,
    Body,
    Delete,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Message')
@Controller()
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
    ) { }

	@ApiOperation({ summary: 'Редактирование сообщения по его id' })
    @Patch('/:id')
    async update(
        @Param('id') id: string,
        @Body() messageData,
    ) {
        return await this.messageService.update(Number(id), messageData);
    }

	@ApiOperation({ summary: 'Удаление сообщения по его id' })
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.messageService.delete( Number(id) );
    }
}