import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },

      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() ** 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of the auth serice', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new users with salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'password');
    expect(user.password).not.toEqual('password');
    const [hash, salt] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });

  // TODO: how to test when error is being thrown by route handler?
  // it('throws an error if user signs up with email that is in use', async () => {
  //   await service.signup('test@test.com', 'password');
  //   expect.assertions(1);

  //   await expect(
  //     service.signup('test@tets.com', 'wrongpassword'),
  //   ).rejects.toThrow(BadRequestException);
  // });

  it('throws if signin is called with an email that doesnt exist', async () => {
    expect.assertions(2);
    try {
      await service.signin('test@wrong.com', 'password');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toEqual('User not found');
    }
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('test@test.com', 'password');
    expect.assertions(1);

    await expect(
      service.signin('test@test.com', 'wrongpassword'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if signin is succesful', async () => {
    await service.signup('test@test.com', 'password');

    const user = await service.signin('test@test.com', 'password');
    expect(user).toBeDefined();
  });
});
