import { User } from '@prisma/client';


export class UserEntity implements User {
    id: number;

    login: string;
    
    password: string;
}