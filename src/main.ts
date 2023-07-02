import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // globalPrefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: ['http://localhost:4200', 'https://beta.atticadt.uwmh.eu'],
    preflightContinue: true,
  });

  // swaggerConfig
  const config = new DocumentBuilder()
    .setTitle('Digital Twins of Athens API')
    .setDescription(
      'The <a href="/api">API</a> provides data to <a href="https://atticadt.uwmh.eu">DT frontend</a> and any interested consumer',
    )
    .setVersion('1.0')
    // .addTag('Digital Twins')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: 999,
      defaultModelExpandDepth: 999,
      syntaxHighlighttheme: 'nord',
    },
    customCssUrl: 'theme-flattop.css',
    customfavIcon: 'favicon.ico',
    customSiteTitle: 'Digital Twins of Athens API',
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
