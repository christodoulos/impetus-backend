import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GeojsonModule } from './geojson/geojson.module';
import { ApnNurseryModule } from './apn-nursery/apn-nursery.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/impetus-dev'),
    UserModule,
    AuthModule,
    GeojsonModule,
    ApnNurseryModule,
  ],
})
export class AppModule {}
