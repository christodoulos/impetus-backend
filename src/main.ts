import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // globalPrefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://beta.atticadt.uwmh.eu'],
    preflightContinue: true,
  });

  // swaggerConfig
  const config = new DocumentBuilder()
    .setTitle('Digital Twins of Athens API')
    .setDescription('API description')
    .setVersion('1.0')
    // .addTag('Digital Twins')
    // .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    customCssUrl: 'theme-flattop.css',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  const port = process.env.PORT || 3456;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
