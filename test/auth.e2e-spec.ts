import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const uniqueEmail = 'xx@yy.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: uniqueEmail, password: 'password' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const cookie = await global.getAuthCookie(app);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(body.email).toEqual('test@test.com');
  });
});
