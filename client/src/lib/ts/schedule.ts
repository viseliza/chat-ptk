import xlsx from 'node-xlsx';
import cheerio from 'cheerio';

export async function getSchedule(group: string, path: string, day: number | undefined = undefined): Promise<string> {
	const workSheetsFromFile = xlsx.parse(path);
	const data = workSheetsFromFile[0].data;

	let column: number = 0;

	// Список всех дней недели
	const days_array = [
		'понедельник',
		'вторник',
		'среда',
		'четверг',
		'пятница',
		'суббота'
	]

	// Итоговое расписание для выбранной группы
	let result: string = "";

	// Перебирает группы из файла
	for (let el of data[6]) {
        if (el != undefined && String(el) == group) {
			break;
		}
		column += 1;
	}

    return day == undefined ? getFullWeak(data, days_array, column) : await getOnlyNow(data, days_array, column, day);

}

export function getFullWeak( data: any[][], days_array: string[], column: number) {
    let result = '';

    for (let row = 7; row < Object.keys(data).length - 1; row++) {
		let time = data[row][column - 1];
		let replacement = data[row][column];
		let day_of_the_weak = data[row][column - 2];
        
		if (day_of_the_weak != undefined && days_array.includes(day_of_the_weak.toLowerCase().trim())) {
			result += `\n${day_of_the_weak}\n`;
		}
		if (replacement == undefined && time == undefined) continue;
		if (replacement == undefined) continue;
		if (time == undefined) {
			time = data[row - 1][column - 1];
		}
		if (replacement.includes("_")) continue;

		time == "8.30-10.10" ? result += `08.30-10.10 | ${replacement}\n` : result += `${time} | ${replacement}\n`
	}
	return result;
}


export async function getOnlyNow( data: any[][], days_array: string[], column: number, day: number ) {
	let result = '';
	// Получение порядка недели
	const response = await fetch('https://portal.novsu.ru/univer/timetable/spo/');
	const $ = cheerio.load(await response.text());
	const weak = $('#npe_instance_125464_npe_content > div:nth-child(4) > b:nth-child(2)').text().trim()
	
	for (let row = 7; row < Object.keys(data).length - 1; row++) {
		let day_of_the_weak = data[ row ][ column - 2 ];
		
		if ( day_of_the_weak != undefined && day_of_the_weak.toLowerCase().trim() == days_array[ day ] ) { 
			let today = true;
			
			while(today) {
				let time = data[ row ][ column - 1 ];
				let replacement = data[ row ][ column ];

				row++;
				if ( data[ row ][ column - 2 ] != undefined && data[ row ][ column - 2 ].toLowerCase().trim() == days_array[ day + 1 ] ) 
					today = false;
				
                if (replacement == undefined && time == undefined) continue;
                if (replacement == undefined) continue;

                if (time == undefined && weak == "(верхняя)") continue;
				else if (time == undefined && weak == "(нижняя)") continue;
				else if (time == undefined) time = data[row - 1][column - 1];
                if (replacement.includes("_")) continue;
				
                time == "8.30-10.10" ? result += `08.30-10.10 | ${replacement}\n` : result += `${time} | ${replacement}\n`
			}
			break;
		}
	}
	return result;
}