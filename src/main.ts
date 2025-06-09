import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite propiedades en el DTO
      forbidNonWhitelisted: true, // Prohíbe propiedades no permitidas
      transform: true, // Transforma automáticamente los tipos
    }),
  );
  const PORT = process.env.PORT;
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server is running on port ${PORT}`);
}
bootstrap();
