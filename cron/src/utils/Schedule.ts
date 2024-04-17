import axios from "axios";
import xlsx from 'node-xlsx';
import cheerio from "cheerio";
import { IGroup } from "../types";
import { existsSync, unlinkSync, writeFileSync } from "fs";

export class Schedule {
    static async dowmloadSchedules() {
        const response = await fetch("https://viseliza.site/api/group/");
        const groups: IGroup[] = await response.json();
        const hrefs = groups.map((group: IGroup) => {
            return group.href.split('?')[0];
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

            const schedule = fileName.split(' ').filter(async (group: string) => {
                await fetch("https://viseliza.site/api/replacement/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        group_name: group,
                        schedule: Schedule.getTheWeeklySchedule(path, group)
                    })
                })
            })

        })
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
        let column: number = 0;
    
        // Перебирает группы из файла
        for (let el of data[6]) {
            if (el != undefined && String(el) == group) {
                break;
            }
            column += 1;
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
        
        for (let row = 7; row < Object.keys(parsedDocumnent.data).length - 1; row++) {
            let time = parsedDocumnent.data[row][parsedDocumnent.column - 2];
            let replacement = parsedDocumnent.data[row][parsedDocumnent.column - 1];
            let day_of_the_weak = parsedDocumnent.data[row][parsedDocumnent.column - 3];
            
            if (day_of_the_weak != undefined && days_array.includes(day_of_the_weak.toLowerCase().trim())) {
                index++;
                resultList[index] = [];
                resultList[index].push(day_of_the_weak);
            }
            
            if (replacement == undefined && time == undefined) continue;

            if (replacement == undefined) continue;
            
            if (time == undefined) 
                time = parsedDocumnent.data[row - 1][parsedDocumnent.column - 2];

            if (replacement.includes("_")) continue;
            
            time == "8.30-10.10" ? resultList[index].push(`08.30-10.10 | ${replacement}`) : resultList[index].push(`${time} | ${replacement}`);
        }
        return resultList;
    }
}