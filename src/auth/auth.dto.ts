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
