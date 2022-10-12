import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = new DocumentBuilder()
  //   .setTitle('Bluebook')
  //   .setDescription('API for comparing car values')
  //   .setVersion('1.0')
  //   .addTag('bluebook')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document, {
  //   customSiteTitle: 'Bluebook API Documentation'
  // });
  await app.listen(3000);
}
bootstrap();
