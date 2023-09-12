import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'someone', description: "The User's username" })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Something hard to easily guess',
    description: "The User's password",
  })
  readonly password: string;
}

export class UserDTO {
  idToken: string;
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
}
