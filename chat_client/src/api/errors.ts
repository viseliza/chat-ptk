const ERRORS: Record<string, string> = {
    'access-denied': 'У вас нет прав на выполнение этой операции',
    'invalid-token': 'Неверный токен',
    'bad-request': 'Вы не передали товар/ы для загрузки'
}

export class AppError extends Error {
    constructor(message: string, code) {
        super(message);
        this.code = code;
    }

    static check(json) {
        if ('status' in json && 'msg' in json) {
            const { status, msg } = json;

            if (Object.values(ERRORS).indexOf(msg) !== -1) {
                const code = Object.keys(ERRORS).find(key => ERRORS[key] === msg)
                throw new AppError(msg, code);
            }

            if (status === 'error' && !msg.includes('Успешно')) {
                throw new AppError(msg, 'unknown-error')
            }
        }
    }
}