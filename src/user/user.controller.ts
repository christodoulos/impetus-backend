import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDTO } from './user.dto';
import { Public } from 'src/app.metadata';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Registers a new User' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    const { username, password, email } = createUserDto;
    try {
      return await this.usersService.create(username, password, email);
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error code:
        throw new HttpException(
          'Username or email already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'An unexpected error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    // type: User,
  })
  async findOneUser(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
