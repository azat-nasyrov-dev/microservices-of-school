export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    displayName?: string;
    email: string;
    password: string;
  }

  export class Response {
    email: string;
  }
}
