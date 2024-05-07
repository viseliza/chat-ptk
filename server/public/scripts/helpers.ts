export function isTeacher(role: string) {
	return role == "TEACHER" ? true : false;
}

export function isSplitedRow(rowObject: any) {
	return rowObject.nextTime ? true : false;
}
