import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private jwtService: JwtService
    ) { } 

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(),
            tokenFromHeader = this.extractTokenFromHeader(request),
            tokenFromCookie = this.extractTokenFromCookie(request);  
        
        let token = null;

        if (tokenFromHeader) {
            token = tokenFromHeader;
        } else if (tokenFromCookie) {
            token = tokenFromCookie
        } else {
            throw new UnauthorizedException(
                'Пользователь не авторизован',
                'unauthorized'
            );
        }

        try {
            request['user'] = await this.jwtService.verifyAsync(token, {
                secret: process.env.SERVER_JWT_SECRET,
            });
        } catch {
            throw new UnauthorizedException(
                'Пользователь не авторизован',
                'unauthorized'
            );
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [ type, token ] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractTokenFromCookie(request: any): string | undefined {
        const [ type, token ] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}