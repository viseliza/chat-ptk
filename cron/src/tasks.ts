import axios from 'axios';
import cheerio from 'cheerio';

class Tasks {
    static async pushGroups() {
        let groupsData = [];

        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('.block_content.content:nth-child(1)').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href')}];

                })
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }

        try {
            const response = await axios.get('https://portal.novsu.ru/univer/timetable/spo/');
            const $ = cheerio.load(response.data);

            $('.block2:nth-child(1)').find('tr').each((_, row) => {
                $(row).find('td').find('a').each(async (_, cell) => {
                    groupsData = [...groupsData, { 'name': $(cell).text(), 'href': $(cell).attr('href')}];
                    console.log({ 'name': $(cell).text(), 'href': $(cell).attr('href')})
                })
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }

        console.log(`| PASS | ${groupsData.length} groups added`);
        /* try {
            const response = await axios.request({
                method: 'POST',
                url: 'http://localhost:18001/groups',
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
        } */
    }
}

Tasks.pushGroups()