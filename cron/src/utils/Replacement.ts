import { IReplacement, IRow } from "../types";
import axios from 'axios';
import cheerio from 'cheerio';
import { writeFileSync, mkdirSync, readdirSync, existsSync, unlinkSync } from 'fs';
// import {WordExtractor} from 'word-extractor';
const WordExtractor = require("word-extractor");

export class Replacement implements IReplacement {
    private readonly collage: string;
    private readonly date: Date;
    private readonly path = 'docs/';

    constructor(date: string, collage: string = "ПТК") {
        if (!existsSync(`docs/${date}`))
            mkdirSync(`docs/${date}`);

        const files = readdirSync(`docs/${date}`);
        files.filter((file) => {
            if (file == `${collage}.doc`)
                unlinkSync(`docs/${date}/${collage}.doc`)
        })

        this.collage = collage;
        this.path += `${date}/${collage}.doc`;
        const dateArray: string[] = date.split(".");
        const formatDate: string = `${dateArray[1]}.${dateArray[0]}.${dateArray[2]}`;
        this.date = new Date(formatDate);

        this.getURLReplacement();
        this.pushIntoDataBase();
    }


    async getURLReplacement(url: string = "https://portal.novsu.ru/univer/timetable/spo/") {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let result: string = url;

        $('.viewtablewhite').find('tr').each((_, row) => {
            $(row).find('td').find('div').each(async (_, cell) => {
                let row = $(cell).find('a');

                if (row.text() == this.collage)
                    result = row.attr('href');
                else if (row.text().toLowerCase().includes(this.date.toLocaleString("ru", { month: 'long' })) && row.text().includes(this.date.getFullYear().toString()))
                    result = row.attr('href')
                else if (row.text().split('.')[1] && row.text().split('.')[0].includes(this.date.getDate().toString()) && row.text().split('.')[1].includes((this.date.getMonth() + 1).toString()))
                    result = row.attr('href')
            })
        })

        if (result == url) return false;

        result.match('https://portal.novsu.ru/file') ? await this.downloadReplacement(result, this.path) : await this.getURLReplacement(result);
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


    private addRow(_value: string[], body: string[], line: number): IRow {
        let data = `${_value[0]}\n${_value[1]}\n`;

        if (!_value[2])
            data += "Нет пары\n";
        else
            data += `${_value[2]}\n`;

        if (_value[3] != undefined && _value[3].toLowerCase() == "не будет")
            data += `${_value[3]}\n\n`;
        else if (_value[3] != undefined && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase()))
            data += `Заменена на ${_value[3]}\n\n`;
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

    public async pushIntoDataBase() {
        if (!existsSync(this.path)) {
            setTimeout(() => {
                this.pushIntoDataBase();
                return 0;
            }, 300);
        } else {
            await fetch("https://viseliza.site/api/replacement/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    date: this.date.toLocaleDateString("ru"),
                    text: await this.parseReplacement()
                })
            })
        }
    }
}