import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Profile } from '@prisma/client';


export class ProfileEntity implements Profile {
    /**
   * The name of the Cat
   * @example Id
   */
    id: number;

    /**
   * The name of the Cat
   * @example email
   */
    email: string;

    /**
   * The name of the Cat
   * @example firstName
   */
    first_name: string;

    /**
   * The name of the Cat
   * @example lastName
   */
    last_name: string;

    /**
   * The name of the Cat
   * @example fatherName
   */
    father_name: string;

    /**
   * The name of the Cat
   * @example theme
   */
    theme: $Enums.Theme;

    /**
   * The name of the Cat
   * @example role
   */
    role: $Enums.Role;

    /**
   * The name of the Cat
   * @example status
   */
    status: string;

    @ApiProperty({
        example: '123',
        description: 'asd'
    })
    user_id: number;

    group_id: number;
}