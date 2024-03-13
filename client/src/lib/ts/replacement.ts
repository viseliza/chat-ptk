import WordExtractor from 'word-extractor';

export async function getReplacemnt(group: string = "", path: string) {
	const extractor = new WordExtractor();
	const extracted = await extractor.extract(path);
	const body = extracted.getBody().split("\n").filter(function (el) {
		return el != '';
	});
	let result = "";
	let answer;

	for (let line = 5; line < body.length - 1; line++) {
		let _value = body[line].split('\t');

		if (_value[0] == '') continue;

		if (!group) {
			answer = addRow(_value, body, line);
			line = answer.line;
			result += answer.result;
		}
		else {
			if (_value[0] == group) {
				answer = addRow(_value, body, line);
				line = answer.line;
				result += answer.result;
			};
		}
	}
	return result == '' ? 'Замены для выбранной группы не найдены!' : result
}	


function addRow(_value: string[], body: string[], line: number) {
	let result = `${_value[0]}\n${_value[1]}\n`;
	if (!_value[2]) result += "Нет пары\n";
	else result += `${_value[2]}\n`;
	if (_value[3] != undefined && _value[3].toLowerCase() == "не будет") {
		result += `${_value[3]}\n\n`;
	} else if (_value[3] != undefined && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase())) {
		result += `Заменена на ${_value[3]}\n\n`;
	} else {
		if (line < body.length && body[line + 1].split("\t")[0].toLowerCase() == "вся группа") {
			result += `${_value[3]} ${body[line + 1].split('\t')[0]}\n\n`;
			line++;
		}
		else result += `${_value[3]}\n\n`;
	}
	return { 
		result,
		line
	};
}






// import WordExtractor from 'word-extractor';

// export async function getReplacemnt(group: string = "", path: string) {
// 	const extractor = new WordExtractor();
// 	const extracted = await extractor.extract(path);
// 	const body = extracted.getBody().split("\n").filter(function (el) {
// 		return el != '';
// 	});
// 	let result = "";


// 	for (let line = 5; line < body.length - 1; line++) {
// 		let _value = body[line].split('\t');

// 		if (_value[0] == '') continue;

// 		if (!group) {
// 			result += `${_value[0]}\n${_value[1]}\nПо расписанию ${_value[2]}\n`;

// 			if (_value[3] != undefined && _value[3].toLowerCase() == "не будет") {
// 				result += `${_value[3]}\n\n`;
// 			} else if (_value[3] != undefined && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase())) {
// 				result += `Заменена на ${_value[3]}\n\n`;
// 			} else {
// 				if (line < body.length && body[line + 1].split("\t")[0].toLowerCase() == "вся группа") {
// 					result += `${_value[3]} ${body[line + 1].split('\t')[0]}\n\n`;
// 					line++;
// 				}
// 				else result += `${_value[3]}\n\n`;
// 			}
// 		}
// 		else {
// 			if (_value[0] == group) {
// 				result += `${_value[0]}\n${_value[1]}\nПо расписанию ${_value[2]}\n`;

// 			if (_value[3] != undefined && _value[3].toLowerCase() == "не будет") {
// 				result += `${_value[3]}\n\n`;
// 			} else if (_value[3] != undefined && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase())) {
// 				result += `Заменена на ${_value[3]}\n\n`;
// 			} else {
// 				if (line < body.length && body[line + 1].split("\t")[0].toLowerCase() == "вся группа") {
// 					result += `${_value[3]} ${body[line + 1].split('\t')[0]}\n\n`;
// 					line++;
// 				}
// 				else result += `${_value[3]}\n\n`;
// 			}
// 			}
// 		}
// 	}
// 	return result == '' ? 'Замены для выбранной группы не найдены!' : result
// }


// function addRow(_value: string[], body: string[], line: number) {
// 	let result = `${_value[0]}\n${_value[1]}\nПо расписанию ${_value[2]}\n`;

// 	if (_value[3] != undefined && _value[3].toLowerCase() == "не будет") {
// 		result += `${_value[3]}\n\n`;
// 	} else if (_value[3] != undefined && ['дистанционное обучение', 'до'].includes(_value[3].toLowerCase())) {
// 		result += `Заменена на ${_value[3]}\n\n`;
// 	} else {
// 		if (line < body.length && body[line + 1].split("\t")[0].toLowerCase() == "вся группа") {
// 			result += `${_value[3]} ${body[line + 1].split('\t')[0]}\n\n`;
// 			line++;
// 		}
// 		else result += `${_value[3]}\n\n`;
// 	}
// 	return result;
// }