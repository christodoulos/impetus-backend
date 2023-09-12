import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly client: OAuth2Client,
  ) {}

  // async login(
  //   username: string,
  //   password: string,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.userService.findOne(username);

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid username or password!');
  //   }

  //   if (!user.emailVerified) {
  //     throw new UnauthorizedException('Verify your email first!');
  //   }

  //   // Check the password
  //   const passwordValid = await bcrypt.compare(password, user.password);

  //   if (!passwordValid) {
  //     throw new UnauthorizedException('Invalid username or password!');
  //   }

  //   // Generate JWT
  //   const payload = {
  //     username: user.username,
  //     sub: user.email,
  //     isAdmin: user.isAdmin,
  //     claims: user.claims,
  //   };
  //   const access_token = this.jwtService.sign(payload);

  //   return { access_token };
  // }

  async verifyGoogleToken(token: string): Promise<{ access_token: string }> {
    console.log('VERIFYING TOKEN', token);
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      // maxExpiry: 60,
      audience:
        '41569250829-h0p6t59q5fs6jl288svjee23o41o3d9b.apps.googleusercontent.com',
    });
    try {
      console.log('VERIFYING TOKEN');
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience:
          '41569250829-h0p6t59q5fs6jl288svjee23o41o3d9b.apps.googleusercontent.com',
      });
      console.log('TICKET', ticket);

      const googlePayload = ticket.getPayload();
      console.log('PAYLOAD', googlePayload);
      const id = googlePayload['sub'];

      const user = await this.userService.findOne(id);
      if (!user) {
        console.log('CREATING USER');
        await this.userService.createGoogleUser(googlePayload);
      } else {
        console.log('UPDATING USER');
        await this.userService.updateGoogleUser(googlePayload);
      }
      // Generate JWT
      const payload = {
        sub: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        claims: user.claims,
      };
      const access_token = this.jwtService.sign(payload);
      return { access_token };
    } catch (error) {
      // Token verification failed
      throw new Error('Invalid Google token.');
    }
  }
}
