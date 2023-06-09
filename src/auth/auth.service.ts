import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password!');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException('Verify your email first!');
    }

    // Check the password
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid username or password!');
    }

    // Generate JWT
    const payload = {
      username: user.username,
      sub: user.email,
      isAdmin: user.isAdmin,
      claims: user.claims,
    };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
