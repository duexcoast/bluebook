import { rm } from 'fs/promises';
import * as request from 'supertest';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';

declare global {
  var getAuthCookie: (app: INestApplication) => Promise<string[]>;
}

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.getAuthCookie = async (app) => {
  const email = 'test@test.com';
  const password = 'password';

  const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  return cookie;
};
