export function isTeacher(column) {
	if (column.role == "TEACHER")
		return true;
	else if (column.role == "STUDENT")
		return false;
}

export function isSplitedRow(rowObject: any) {
	return rowObject.nextTime ? true : false;
}
