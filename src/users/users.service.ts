import { Injectable } from '@nestjs/common';
//import { User } from './interfaces/user.interface';

import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      user_id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      user_id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
