import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use. Error will be thrown by
    // unique constraint on User Entity and caught by route handler
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      console.log(users);
      throw new BadRequestException(
        'email already in use -- thrown in auth ser',
      );
    }

    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = hash.toString('hex') + '.' + salt;

    // Create a new user and save it
    const user = await this.usersService.create(email, result);

    // Return the new user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found -- auth service');
    }

    const [storedHash, salt] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password');
    }
    return user;
  }
}
