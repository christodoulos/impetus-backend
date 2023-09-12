import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OAuth2Client } from 'google-auth-library';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'this a secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, OAuth2Client],
  controllers: [AuthController],
})
export class AuthModule {}
