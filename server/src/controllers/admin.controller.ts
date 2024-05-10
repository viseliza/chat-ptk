import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import puppeteer from 'puppeteer';
import { CronController } from 'src/utils/CronController';
import { Replacement } from 'src/utils/Replacement';
import { Schedule } from 'src/utils/Schedule';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller()
export class AdminController {
	@ApiOperation({ summary: 'Проверка и обновление замен' })
    @Get('update/replacement/:date')
    async updateReplacement(@Param('date') date: string) {
        const replacement = new Replacement(date, 'ПТК');
        await replacement.main();
        return {};
    }

    @ApiOperation({ summary: 'Проверка и обновление расписаний' })
    @Get('update/schedule/')
    async updateSchedule() {
        await CronController.pushGroups(); 
        await Schedule.dowmloadSchedules();
        return {};
    }

    @ApiOperation({ summary: 'Получение фотографии отчета' })
    @Get(':table/:param')
    async generatePDF(
            @Param('table') table: string,
            @Param('param') param: string
        ) {
        const browser = await puppeteer.connect({
            browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT
        });
        const page = await browser.newPage();
        await page.goto(`https://viseliza.site/api/report/${table}/${param}`);
        const buffer = await page.pdf({ path: `public/photos/${param}.pdf`, format: 'A4' });
        await browser.close();
        return buffer;
    }

    @ApiOperation({ summary: 'Получение фотографии отчета' })
    @Get('groups/')
    async pushGroups() {
        await CronController.pushGroups();
    }
}