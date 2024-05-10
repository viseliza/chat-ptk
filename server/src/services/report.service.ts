import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ReportService {

	isNotEmptyReplacement(data): boolean  {
        return data != "На сегодня замен в вашей группе нет" ? true : false;
	}

    formatingReplacement(data: string[]) {
        data = data.filter(row => row);
        let formatedData = {};
        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                formatedData[i] = {};
                formatedData[i].group = data[i].split("\n")[0];
                formatedData[i].row_number = data[i].split("\n")[1];
                formatedData[i].perv = data[i].split("\n")[2];
                formatedData[i].replace = data[i].split("\n")[3];
            }
        }
        return formatedData;
    }

    async generatePDF(url, outputPath) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.pdf({ path: outputPath, format: 'A4' });
        await browser.close();  
    }

    getRoleSchedule(group) {
        return !isNaN(group) || group.split('_').length - 1 ? 'STUDENT' : 'TEACHER'
    }

    formatingSchedule(data, role) {
        const days_array = [
            'ПОНЕДЕЛЬНИК',
            'ВТОРНИК',
            'СРЕДА',
            'ЧЕТВЕРГ',
            'ПЯТНИЦА',
            'СУББОТА'
        ];

        let formatedData = [];
        for (let i = 0; i < data.length; i++) {
            formatedData[i] = {};
            formatedData[i].day = !data[i][0] ? days_array[i] : data[i][0];
            formatedData[i].column_none = data[i][1] ? false : true;


            if (!formatedData[i].column_none) {
                formatedData[i].columns = [];
                for (let row = 1; row < data[i].length; row++){
                    const item = this.addItemOnFormattedSchedule(row + 1 == data[i].length ? '' : data[i][row + 1], data[i][row], role);
                    formatedData[i].columns.push(item);
                    if (item.nextTime) 
                        row++;
                }
            }
        }
        return formatedData;
    }

    addItemOnFormattedSchedule(next_row: string, row: string, role: string) {
        let rowObject: any = {
            time: row.split(" | ")[0],
            role: role
        };
        
        if (role == 'TEACHER') {
            rowObject.group = row.split(" | ")[1];
            rowObject.text = row.split(" | ")[2];
        } else {
            rowObject.text = row.split(" | ")[1];
        }

        if (next_row.split(" | ")[0] == rowObject.time) {
            if (role == 'TEACHER') {
                rowObject.nextTime = rowObject.time;
                rowObject.nextGroup = next_row.split(" | ")[1];
                rowObject.nextText = next_row.split(" | ")[2];
            } else {
                rowObject.nextTime = rowObject.time;
                rowObject.nextText = next_row.split(" | ")[1];
            }
        }
        
        return rowObject;
    }
}