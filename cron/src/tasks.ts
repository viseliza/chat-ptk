import axios from 'axios';
import cheerio from 'cheerio';
import { Replacement } from './utils/Replacement';
import { Schedule } from './utils/Schedule';

class Tasks {
    static pushReplacement() {
        const replacement = new Replacement(new Date().toLocaleDateString("ru"));
    }


    static async pushGroups() {
        let groupsData = [];

        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('#npe_instance_125460_npe_content').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href')}];
                    console.log($(cell).text())
                })
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }

        // try {
        //     const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
        //     const $ = cheerio.load(response.data);

        //     $('.block2:nth-child(1)').find('tr').each((_, row) => {
        //         $(row).find('td').find('a').each(async (_, cell) => {
        //             groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href')}];
        //             console.log({ 'name': $(cell).text(), 'href': $(cell).attr('href')})
        //         })
        //     })
        // } catch (error) {
        //     console.error('Ошибка:', error);
        // }

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

Tasks.pushGroups();
// Schedule.dowmloadSchedules();
// Tasks.start();
// Tasks.pushGroups()
// Tasks.checkRole("s241910")