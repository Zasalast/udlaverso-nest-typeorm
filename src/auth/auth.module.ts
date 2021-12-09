import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule,
    PassportModule,
    JwtModule.registerAsync(
      {
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => {
          return {
            secret: configService.jwtSecret, signOptions: { expiresIn: '1d' }
          }
        }
      }
    )],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
