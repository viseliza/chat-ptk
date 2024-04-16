import axios from "axios";
import cheerio from "cheerio";
import { IGroup } from "../types";
import { existsSync, unlinkSync, writeFileSync } from "fs";

export class Schedule {
    static async dowmloadSchedules() {
        const response = await fetch("http://localhost:18001/api/group/");
        const groups: IGroup[] = await response.json();
        const hrefs = groups.map((group: IGroup) => {
            return group.href.split('?')[0];
        });
        const hrefsUnique = new Set(hrefs);

        hrefsUnique.forEach(async (href: string) => {
            const fileName = href.split('/')[5].split('.')[0];
            if (existsSync(`xls/${fileName}.xls`))
                unlinkSync(`xls/${fileName}.xls`);
            const result = await fetch(`https://portal.novsu.ru${href}`);
            const arrayBuffer = await result.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return writeFileSync(`xls/${fileName}.xls`, buffer);
        })
    }

    static async refreshLinks() {
        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('.block_content.content:nth-child(1)').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    await fetch("http://localhost:18001/group/", {
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
}