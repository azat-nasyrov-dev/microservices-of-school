import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }
}
