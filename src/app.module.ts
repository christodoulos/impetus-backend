import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GeojsonModule } from './geojson/geojson.module';
import { ApnNurseryModule } from './apn-nursery/apn-nursery.module';
import { FarmairModule } from './farmair/farmair.module';

import { AuthGuard } from './auth/auth.guard';

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
    FarmairModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
