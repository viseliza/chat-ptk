import { Schedule } from '../utils/Schedule';
import { Replacement } from '../utils/Replacement';
import { CronController } from '../utils/CronController';
import { scheduleJob } from 'node-schedule';


export class CronStart {

    constructor() {
        const scheduleDeleteTrash = scheduleJob('* 20 0 * * 0', () => {
            console.log("| PASS | " + new Date().toLocaleDateString("ru") + " | " + new Date().toLocaleTimeString() + " | CRON DELETE TRASH STARTED");
            CronController.deleteTrash();
            console.log("| PASS | " + new Date().toLocaleDateString("ru") + " | " + new Date().toLocaleTimeString() + " | CRON DELETE TRASH ENDED");
        });

        const scheduleDownloadReplacement = scheduleJob('* 30 0 * * *', () => {
            console.log("| PASS | " + new Date().toLocaleDateString("ru") + " | " + new Date().toLocaleTimeString() + " | CRON UPDATE REPLACEMENT STARTED");
            const replacement = new Replacement(new Date().toLocaleDateString("ru"));
            // const replacementMC = new Replacement(new Date().toLocaleDateString("ru"), "МК");
            // const replacementGEK = new Replacement(new Date().toLocaleDateString("ru"), "ГЭК");
            console.log("| PASS | " + new Date().toLocaleDateString("ru") + " | " + new Date().toLocaleTimeString() + " | CRON UPDATE REPLACEMENT ENDED");
        });
        
        const scheduleDownloadSchedule = scheduleJob(' *30 0  * * 0', () => {
            console.log("| PASS | " + new Date().toLocaleDateString("ru") + " | " + new Date().toLocaleTimeString() + " | CRON UPDATE SCHEDULE STARTED");
            Schedule.dowmloadSchedules();
            console.log("| PASS | " + new Date().toLocaleDateString("ru") + " | " + new Date().toLocaleTimeString() + " | CRON UPDATE SCHEDULE ENDED");
        });
    }
}