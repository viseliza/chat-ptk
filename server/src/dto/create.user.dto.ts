import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewUserDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your NovSU login'})
    login: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your NovSU password'})
    password: string;
}