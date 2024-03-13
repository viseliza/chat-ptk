import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

enum Theme {
    White, Dark
}

enum Role {
    Student, Teacher
}

export class NewProfileDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your first name'})
    first_name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your last name'})
    last_name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    theme: Theme;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    @Length(0, 150, {
        message: 'Status lenght must be between 0 and 150 charcters'
    })
    status: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your NovSU user'})
    user_id: number;

    @ApiProperty()
    group_id: number;
}