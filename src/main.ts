import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //Security for user not be able to send a request with another property that's not whitelisted in the dto.For example:
      //sending a request with {admin: true}.
      whitelist: true,
    }),
  ),
    await app.listen(3000);
}
bootstrap();
