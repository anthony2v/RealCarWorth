import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createAccount(email: string, password: string): Promise<string> {
    // see if email is in use
    if ((await this.usersService.find(email)).length) throw new BadRequestException('Email in use');

    // hash the user's password

    // create a new user and save it

    // return the user id
    return '';
  }

  authenticate() {}
}
