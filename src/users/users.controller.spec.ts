import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        //
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'password',
          } as User,
        ]);
      },
      findOne: (id: number) => {
        //
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'password',
        } as User);
      },
      // update: (id: number, attrs: Partial<User>) => {
      //   //
      //   return Promise.resolve(user);
      // },
      // remove: (id: number) => {
      //   //
      //   return Promise.resolve(user);
      // },
    };
    fakeAuthService = {
      // signup: (email: string, password: string) => {
      //   //
      //   return Promise.resolve(user);
      // },
      // signin: (email: string, password: string) => {
      //   //
      //   return Promise.resolve(user);
      // },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('');
});
