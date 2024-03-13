import xlsx from 'node-xlsx';
import cheerio from 'cheerio';

interface ISchedule {
    getTheWeeklySchedule: () => string;
    getTheDailySchedule: (day_of_the_weak: number) => Promise<string>;
}

interface IParsedDocument {
    data: string[][];
    column: number;
}

export class Schedule implements ISchedule {
    private readonly path = "src/lib/docs/1911 1981 1991 1992.xlsx";
    private readonly parsedDocumnent = this.parseTheDocument();
    public readonly group: string;
    public readonly days_array = [
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота'
    ]

    constructor(group: string) {
        this.group = group;
    }

    /** Парсинг excel документа, с расписанием группы студента
     * @returns {IParsedDocument}
     */
    private parseTheDocument(): IParsedDocument {
        const workSheetsFromFile = xlsx.parse(this.path);
        const data = workSheetsFromFile[0].data;
        let column: number = 0;
    
        // Перебирает группы из файла
        for (let el of data[6]) {
            if (el != undefined && String(el) == this.group) {
                break;
            }
            column += 1;
        }

        return { data, column }
    }

    /** Получение расписания заданной группы на неделю
     * @returns {string}
     */
    public getTheWeeklySchedule(): string {
        let result = '';
        
        for (let row = 7; row < Object.keys(this.parsedDocumnent.data).length - 1; row++) {
            let time = this.parsedDocumnent.data[row][this.parsedDocumnent.column - 2];
            let replacement = this.parsedDocumnent.data[row][this.parsedDocumnent.column - 1];
            let day_of_the_weak = this.parsedDocumnent.data[row][this.parsedDocumnent.column - 3];
            
            if (day_of_the_weak != undefined && this.days_array.includes(day_of_the_weak.toLowerCase().trim())) {
                result += `\n${day_of_the_weak}\n`;
            }
            
            if (replacement == undefined && time == undefined) continue;
            if (replacement == undefined) continue;
            if (time == undefined) {
                time = this.parsedDocumnent.data[row - 1][this.parsedDocumnent.column - 1];
            }
            if (replacement.includes("_")) continue;
            time == "8.30-10.10" ? result += `08.30-10.10 | ${replacement}\n` : result += `${time} | ${replacement}\n`
        }
        return result;
    }

    /** Получение расписания на выбранный день недели
     * @param {string} day_of_the_weak
     * @returns {Promise<string>}
     */
    public async getTheDailySchedule(day_of_the_weak_num: number): Promise<string> {
        // Получение порядка недели (верхняя/нижнняя)
        const response = await fetch('https://portal.novsu.ru/univer/timetable/spo/');
        const $ = cheerio.load(await response.text());
        const weak = $('#npe_instance_125464_npe_content > div:nth-child(4) > b:nth-child(2)').text().trim();
        
        let result = '';
        
        for (let row = 7; row < Object.keys(this.parsedDocumnent.data).length - 1; row++) {
            let day_of_the_weak = this.parsedDocumnent.data[ row ][ this.parsedDocumnent.column - 3 ];
            
            if ( day_of_the_weak != undefined && day_of_the_weak.toLowerCase().trim() == this.days_array[ day_of_the_weak_num ] ) { 
                let today = true;
                
                while(today) {
                    let time = this.parsedDocumnent.data[ row ][ this.parsedDocumnent.column - 2 ];
                    let replacement = this.parsedDocumnent.data[ row ][ this.parsedDocumnent.column - 1];
                    
                    row++;

                    if ( this.parsedDocumnent.data[ row ][ this.parsedDocumnent.column - 3 ] != undefined && this.parsedDocumnent.data[ row ][ this.parsedDocumnent.column - 3 ].toLowerCase().trim() == this.days_array[ day_of_the_weak_num + 1 ])
                        today = false;
                    else if (day_of_the_weak_num == 5 && time != undefined && time.includes('16.15') && this.parsedDocumnent.data[ row + 1 ][ this.parsedDocumnent.column - 2 ] == undefined)
                        today = false;
                    
                    if (replacement == undefined && time == undefined) continue;
                    if (replacement == undefined) continue;
    
                    if (time == undefined && weak == "(верхняя)") continue;
                    else if (time == undefined && weak == "(нижняя)") continue;
                    else if (time == undefined) time = this.parsedDocumnent.data[row - 1][this.parsedDocumnent.column - 1];
                    if (replacement.includes("_")) continue;
                    
                    time == "8.30-10.10" ? result += `08.30-10.10 | ${replacement}\n` : result += `${time} | ${replacement}\n`
                }
                break;
            }
        }
        return result;
    };
}