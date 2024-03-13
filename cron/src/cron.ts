import { CronJob } from 'cron';

export class CronStart {

    cronJob: CronJob;

    constructor() {
        this.cronJob = new CronJob('*/10 * * * * *', async () => {
            // try { await GroupController.instertGroup() }
            // catch (e) { console.error(e) }
            // fetch('http://localhost:3000/auth')
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((data) => {
            //         console.log(data);
            //     });
        })
        if (!this.cronJob.running) 
            this.cronJob.start();
    }
}