import WordExtractor from 'word-extractor';


interface IReplacement {
    getReplacement: (group: string) => Promise<string>;
}

interface IRow {
    data: string;
    line: number
}

export class Replacement implements IReplacement {
    date: Date;
    private readonly path = 'src/lib/docs/';

    constructor(date: string) {
        this.path += `30.10.2023.doc`;
        // this.path += `${date}.doc`;
        const dateArray: string[] = date.split(".");
        const formatDate: string = `${dateArray[1]}.${dateArray[0]}.${dateArray[2]}`;
        this.date = new Date(formatDate);
    }

    public async getReplacement(group?: string): Promise<string> {
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

            if (!group) {
                answer = this.addItem(_value, body, line);
                line = answer.line;
                result += answer.data;
            }
            else {
                if (_value[0] == group) {
                    answer = this.addItem(_value, body, line);
                    line = answer.line;
                    result += answer.data;
                };
            }
        }
        return result == '' ? 'На сегодня замен в вашей группе нет' : result
    }

    private addItem(_value: string[], body: string[], line: number): IRow {
        let data = `${_value[0]}\n${_value[1]}\n`;

        if (!_value[2]) 
            data += "Нет пары\n";
        else 
            data += `${_value[2]}\n`;

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
}