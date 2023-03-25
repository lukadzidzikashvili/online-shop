import { ValidationPipe } from './pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { UnauthorizedExceptionFilter } from './exceptions/unauthorized.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
