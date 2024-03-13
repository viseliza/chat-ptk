import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewGroupDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter the group name'})
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter href replacement'})
    href: string;
}