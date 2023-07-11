import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Form of email is not correct' })
  readonly email: string;

  @IsString({ message: 'Password should be a string' })
  @Length(4, 16, {
    message: 'Password should be more than 4 symbols and not more then 16 symbols',
  })
  readonly password: string;
}
