import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Get ConfigService instance
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3000;

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  /* ---------------- Swagger docs ---------------- */
  const options = new DocumentBuilder()
    .setTitle('Monitor-The-Situation')
    .setDescription('All APIs for Monitor-The-Situation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Authorization', in: 'header' },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/api-docs', app, document);

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
