import axios from 'axios';
import cheerio from 'cheerio';
import { writeFileSync, mkdirSync, readdirSync, existsSync, unlinkSync } from 'fs';
const WordExtractor = require("word-extractor");

export class Replacement {
    private readonly collage: string;
    private readonly date: Date;
    private readonly path = 'public/docs/';

    constructor(date: string, collage: string = "ПТК") {
        if (!existsSync(`public/docs/${date}`)) {
            mkdirSync(`public/docs/${date}`);
        }
            
        const files = readdirSync(`public/docs/${date}`);
        files.filter((file) => {
            if (file == `${collage}.doc`)
                unlinkSync(`public/docs/${date}/${collage}.doc`)
        })

        this.collage = collage;
        this.path += `${date}/${collage}.doc`;
        const dateArray: string[] = date.split(".");
        const formatDate: string = `${dateArray[1]}.${dateArray[0]}.${dateArray[2]}`;
        this.date = new Date(formatDate);
    }


    async main() {
        const url_first = await this.getURLReplacement();
        const url_second = await this.getURLReplacement(url_first);
        const result = await this.getURLReplacement(url_second);
        let error: string = '';
        if (result == url_second || !result.match('https://portal.novsu.ru/file')) {
            error = "Расписания для колледжа " + this.collage + " на " + this.date.toLocaleDateString() + " число нет";
        } else {
            await this.downloadReplacement(result, this.path);
        }
        await this.pushIntoDataBase(error);
    }

    async getURLReplacement(url: string = "https://portal.novsu.ru/univer/timetable/spo/") {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let result: string = url;

        $('.viewtablewhite').find('tr').each((_, row) => {
            $(row).find('td').find('div').each((_, cell) => {
                let row = $(cell).find('a');

                if (row.text() == this.collage)
                    result = row.attr('href');
                else if (row.text().toLowerCase().includes(this.date.toLocaleString("ru", { month: 'long' })) && row.text().includes(this.date.getFullYear().toString()))
                    result = row.attr('href')
                else if (row.text().split('.')[1] && row.text().split('.')[0].includes(this.date.getDate().toString()) && row.text().split('.')[1].includes(((this.date.getMonth() + 1)).toString()))
                    result = row.attr('href')
            })
        })

        return result;
    }


    private async downloadReplacement(url, path): Promise<void> {
        const result = await fetch(url);
        const arrayBuffer = await result.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return writeFileSync(path, buffer);
    }


    public async parseReplacement(): Promise<string> {
        const extractor = new WordExtractor();
        const extracted = await extractor.extract(this.path);
        const body = extracted.getBody().split("\n").filter(function (el) {
            return el != '';
        });
        let result = "";
        let answer;

        for (let line = 5; line < body.length - 1; line++) {
            let _value = body[line].split('\t');

            if (_value[0] == '') continue;


            answer = this.addRow(_value, body, line);
            line = answer.line;
            result += answer.data;

        }
        return !result ? `На сегодня в ${this.collage} замен нет` : result;
    }


    private addRow(_value: string[], body: string[], line: number) {
        let data = `${_value[0]}\n${_value[1]}\n`;

        if (!_value[2])
            data += "Нет пары\n";
        else
            data += `${_value[2]}\n`;
        console.log(_value[3])
        if (_value[3] && _value[3].trim().toLowerCase() == "не будет")
            data += `${_value[3]}\n\n`;
        else if (_value[4] && _value[4].trim().toLowerCase() == "не будет")
            data += `${_value[4]}\n\n`;
        else if (_value[3] && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase().trim()))
            data += `Заменена на ${_value[3]}\n\n`;
        else if (_value[4] && ['дистанционное обучение', 'до'].includes(_value[4].toLowerCase().trim()))
            data += `Заменена на ${_value[4]}\n\n`;
        else {
            if (line < body.length && body[line + 1].split("\t")[0].toLowerCase() == "вся группа") {
                data += `${_value[3]} ${body[line + 1].split('\t')[0]}\n\n`;
                line++;
            }
            else data += `${_value[3]}\n\n`;
        }
        return {
            data,
            line
        };
    }

    public async pushIntoDataBase(error: string = "") {
        if (!existsSync(this.path) && !error) {
            setTimeout(async () => {
                await this.pushIntoDataBase();
                return 0;
            }, 300);
        } else {
            console.log(error ? error : await this.parseReplacement())
            await fetch("https://viseliza.site/api/replacement/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    date: this.date.toLocaleDateString("ru"),
                    text: error ? error : await this.parseReplacement()
                })
            })
            console.log("| SUCCESS | " + this.collage)
        }
    }
}