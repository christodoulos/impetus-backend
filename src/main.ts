import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1); // t.ly/uGJO

  app.use(helmet());

  // globalPrefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // app.enableCors({
  //   origin: ['http://localhost:4200', 'https://atticadt.uwmh.eu'],
  //   preflightContinue: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include the required methods
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers needed for your requests
  // });
  app.enableCors();

  // Apply the ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

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
      syntaxHighlight: false,
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
