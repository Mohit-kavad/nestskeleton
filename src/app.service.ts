import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { name: string } {
    // return '<h1>Hello World!</h1>';
    return { name: 'Hello nestjs' };
  }
}
