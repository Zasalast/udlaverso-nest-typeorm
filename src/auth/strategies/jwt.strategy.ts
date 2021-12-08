import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './../../config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(config.KEY) ConfigService: ConfigType<typeof config>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false,
            secretOrKey: ConfigService.jwtSecret
        });
    }

    async validate(payload: PayloadToken) {
        return payload;
    }
}