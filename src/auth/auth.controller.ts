import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { Public } from 'src/app.metadata';

@ApiTags('Authentication Management')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Login a User' })
  @ApiBody({ type: AuthDTO })
  @ApiResponse({
    status: 200,
    description: "The user's access token",
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: AuthDTO): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    return this.authService.login(username, password);
  }
}
