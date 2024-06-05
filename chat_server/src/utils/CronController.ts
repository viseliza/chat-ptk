import { readdirSync, rmdirSync } from "fs";
import axios from 'axios';
import cheerio from 'cheerio';


export class CronController {
    static async deleteTrash() {
        const dir = readdirSync('./public/docs');
        dir.forEach((subdir: string) => {
            const splited = subdir.split('.');
            const date = new Date(`${splited[1]}.${splited[0]}.${splited[2]}`);
            if ((date.getTime() + (1000 * 3600 * 24 * 7)) < new Date().getTime()) {
                rmdirSync(`public/docs/${subdir}`);
                console.log("| PASS | " + new Date().toLocaleTimeString() + ` | FOLDER '${subdir}' HAS BEEN DELETED`);
            }
        })
    }

    static async pushGroups() {
        await fetch("https://viseliza.site/api/group/", {
            method: "DELETE"
        });
        
        let groupsData = [];

        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('#npe_instance_125460_npe_content').find('tr').each((_, row) => {
                $(row).find('td').find('a').each((_, cell) => {
                    groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href')}];
                    console.log("| PASS | " + new Date().toLocaleTimeString() + " | " + $(cell).text())
                })
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }


        console.log(`| PASS | ${groupsData.length} groups added`);
        try {
            const response = await axios.request({
                method: 'POST',
                url: 'https://viseliza.site/api/group/groups',
                data: groupsData,
                validateStatus: (status) => { 
                    return true;
                }
            })

            console.log(await response.data);
        } catch (error) {
            if (error instanceof axios.AxiosError)
                console.log(`| FAIL | Error: ${error.cause.message}`)
            else
                console.log(`| FAIL | Error: ${error}`)
        }
    }
}