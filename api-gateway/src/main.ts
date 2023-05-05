import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './commom/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './commom/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8888);
}
bootstrap();
