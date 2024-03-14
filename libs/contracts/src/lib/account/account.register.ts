import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @IsOptional()
    @IsString()
    displayName?: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
  }

  export class Response {
    email: string;
  }
}
