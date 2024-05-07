import {
    Controller,
    Get,
    Param,
    Render,
    Res
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ReplacementService } from 'src/services/replacement.service';
import { ReportService } from 'src/services/report.service';
import { ScheduleService } from 'src/services/schedule.service';


@ApiBearerAuth()
@ApiTags('Report')
@Controller()
export class ReportController {
    constructor(
        private readonly replacementService: ReplacementService,
        private readonly scheduleService: ScheduleService,
        private readonly reportService: ReportService,
    ) { }

    @ApiOperation({ summary: 'Получение отчета по заменам в выбранный день' })
    @Get('/replacement/:date')
    @Render('replacement')
    async getReplacement(@Param('date') date: string) {
        const replacement = await this.replacementService.get(date);
        return {
            title: 'Отчет замен',
            fullTitle: `Замены на ${date}`,
            engTitle: 'replacement',
            isNotEmpty: this.reportService.isNotEmptyReplacement(replacement.text),
            replacement: this.reportService.formatingReplacement(replacement.text.split('\n\n'))
        };
    }

    @ApiOperation({ summary: 'Выборка группы профиля с заданым user_id' })
    @Get('/schedule/:group')
    async getSchedule(@Param('group') group: string, @Res() res: Response) {
        const scheduleResponse = await this.scheduleService.get(group); 
        const role = this.reportService.getRoleSchedule(group);
        const formatedData = this.reportService.formatingSchedule(scheduleResponse.scheduleList,role);
        
        return res.render(
            'schedule',
            { 
                title: 'Отчет текущего расписания выбранной группы',
                fullTitle: role == 'STUDENT' ? `Расписание группы ${group}` : `Расписание преподавателя ${group}`,
                engTitle: 'schedule',
                role: role,
                schedule: formatedData
            },
        );
    }
}