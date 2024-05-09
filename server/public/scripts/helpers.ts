export function isTeacher(role: string) {
	if (role == "TEACHER")
		return true;
	else if (role == "STUDENT")
		return false;
}

export function isSplitedRow(rowObject: any) {
	return rowObject.nextTime ? true : false;
}
