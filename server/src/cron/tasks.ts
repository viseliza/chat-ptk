import axios from 'axios';
import cheerio from 'cheerio';
import { Schedule } from '../utils/Schedule';
import { Replacement } from '../utils/Replacement';
import puppeteer from 'puppeteer';

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
                $(row).find('td').find('a').each((_, cell) => {
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

    static async generatePDF(url, outputPath) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.pdf({ path: outputPath, format: 'A4' });
        await browser.close();  
    }
}

Tasks.generatePDF('http://localhost:18001/api/report/replacement/03.05.2024', 'googl`e.pdf')
    .then(() => console.log('PDF generated successfully'))
    .catch(err => console.error('Error generating PDF:', err));
// Schedule.dowmloadSchedules();
// const replacement = new Replacement('03.05.2024');
// const replacementMC = new Replacement(new Date().toLocaleDateString("ru"), "МК");
// const replacementGEK = new Replacement(new Date().toLocaleDateString("ru"), "ГЭК");
// Tasks.start();
// Tasks.pushGroups()
// Tasks.checkRole("s241910")