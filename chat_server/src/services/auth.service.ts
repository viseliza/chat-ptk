import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async login(
        data
    ): Promise< UnauthorizedException | InternalServerErrorException | Object> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { login: data.login },
                include: {
                    profile: {
                        select: {
                            theme: true
                        }
                    }
                }
            })
            
            if (!user || !(await bcrypt.compare(data.password, user.password))) {
                return new UnauthorizedException({
                    error: 'unauthorized',
                    message: 'Пользователь не авторизован'
                })
            }

            return {
                access_token: await this.jwtService.signAsync({
                    user_id: user.id,
                    login: user.login,
                    theme: user.profile.theme
                }),
            }
        } catch (error) {
            console.error(`[ ERROR/services/api/auth/login ] ${error}`);
            return new InternalServerErrorException({
                message: 'Произошла ошибка при выполнении запроса',
                code: 'internal_server_error',
            })
        }
    }
}