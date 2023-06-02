import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // globalPrefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // swaggerConfig
  const config = new DocumentBuilder()
    .setTitle('Digital Twins of Athens API')
    .setDescription('API description')
    .setVersion('1.0')
    // .addTag('Digital Twins')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3456;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
