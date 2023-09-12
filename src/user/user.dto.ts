import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'someone', description: "The User's username" })
  readonly username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'Something hard to easily guess',
    description: "The User's password",
  })
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'someone@somewhere.com',
    description: "The User's email",
  })
  readonly email: string;
}

export class UserDTO {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
}
