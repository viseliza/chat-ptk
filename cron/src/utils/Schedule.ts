import axios from "axios";
import xlsx from 'node-xlsx';
import cheerio from "cheerio";
import { IGroup } from "../types";
import { existsSync, unlinkSync, writeFileSync } from "fs";

export class Schedule {
    static async dowmloadSchedules() {
        const response = await fetch("https://viseliza.site/api/group/");
        const groups: IGroup[] = await response.json();
        let hrefs = [];
        let scheduleLists = [];

        groups.forEach((group: IGroup) => {
            if (group.href && group.name != "_30")
                hrefs = [...hrefs, group.href.split('?')[0]];
        });
        const hrefsUnique = new Set(hrefs);

        hrefsUnique.forEach(async (href: string) => {
            const fileName = href.split('/')[5].split('.')[0];
            const path = `xls/${fileName}.xls`;
            if (existsSync(path))
                unlinkSync(path);
            const result = await fetch(`https://portal.novsu.ru${href}`);
            const arrayBuffer = await result.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            writeFileSync(path, buffer);
                fileName.split(' ').forEach(async (group: string) => {
                    let scheduleList = Schedule.getTheWeeklySchedule(path, group);
                    scheduleLists = [...scheduleLists, scheduleList];
                    await fetch("https://viseliza.site/api/schedule/", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({
                            group_name: group,
                            scheduleList: scheduleList
                        })
                    })
                })
        });
        setTimeout(() => {
            scheduleLists.forEach((schedule) => {
                console.log(schedule)
            })
        }, 5000);
    }

    static async refreshLinks() {
        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('.block_content.content:nth-child(1)').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    await fetch("https://viseliza.site/api/group/", {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({
                            name: $(cell).text(),
                            href: $(cell).attr('href')
                        })
                    })
                })
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }

    }

    static getTheWeeklySchedule(path: string, group: string) {
        const workSheetsFromFile = xlsx.parse(path);
        const data = workSheetsFromFile[0].data;
        let rowStart = 7;
        let column: number = 0;

        // Перебирает группы из файла
        for (let el of data[6]) {
            if (el != undefined && String(el).includes(group))
                break;
            column += 1;
        }

        if (column == data[6].length) {
            rowStart = 9;
            column = 0;
            for (let el of data[8]) {
                if (el != undefined && String(el).includes(group))
                    break;
                column += 1;
            }
        }

        if (column == data[8].length) {
            rowStart = 10;
            column = 0;
            for (let el of data[9]) {
                if (el != undefined && String(el).includes(group))
                    break;
                column += 1;
            }
        }


        const parsedDocumnent = { data, column };
        const days_array = [
            'понедельник',
            'вторник',
            'среда',
            'четверг',
            'пятница',
            'суббота'
        ];


        let index: number = -1;
        let resultList: string[][] = [];

        for (let row = rowStart; row < Object.keys(parsedDocumnent.data).length - 1; row++) {
            let time = parsedDocumnent.data[row][parsedDocumnent.column - 1];
            let replacement = parsedDocumnent.data[row][parsedDocumnent.column];
            let day_of_the_weak = parsedDocumnent.data[row][parsedDocumnent.column - 2];

            if (day_of_the_weak != undefined && days_array.includes(day_of_the_weak.toLowerCase().trim())) {
                index++;
                resultList[index] = [];
                resultList[index] = [...resultList[index], day_of_the_weak];
            }

            if (replacement == undefined && time == undefined) continue;

            if (replacement == undefined) continue;

            if (time == undefined)
                time = parsedDocumnent.data[row - 1][parsedDocumnent.column - 1];

            if (replacement.includes("_")) continue;

            resultList[index] = time == "8.30-10.10" ? [...resultList[index], `08.30-10.10 | ${replacement}`] : [...resultList[index], `${time} | ${replacement}`];
        }
        return resultList;
    }

    
}