import { readdirSync, rmdirSync } from "fs";

export class FileController {
    static async deleteTrash() {
        const dir = readdirSync('docs');
        dir.forEach((subdir: string) => {
            const splited = subdir.split('.');
            const date = new Date(`${splited[1]}.${splited[0]}.${splited[2]}`);
            if (date.getTime() + 604800000 < new Date().getTime()) {
                rmdirSync(`docs/${subdir}`);
                console.log("| PASS | " + new Date().toLocaleTimeString() + ` | FOLDER '${subdir}' HAS BEEN DELETED`);
            }
        })
    }
}