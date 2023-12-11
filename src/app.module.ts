import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CaslModule } from './casl/casl.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './throttler-behind-proxy.guard';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GeojsonModule } from './geojson/geojson.module';
import { ApnNurseryModule } from './apn-nursery/apn-nursery.module';
import { FarmairModule } from './farmair/farmair.module';

import { AuthGuard } from './auth/auth.guard';
import { AtticaGreenModule } from './attica-green/attica-green.module';
import { AtticadtModule } from './atticadt/atticadt.module';
import { HipsModule } from './hips/hips.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 120,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/impetus-dev', {
      connectionName: 'impetus-dev',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/attica_green', {
      connectionName: 'attica_green',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/attica_dt', {
      connectionName: 'attica_dt',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/hips', {
      connectionName: 'hips',
    }),
    UserModule,
    AuthModule,
    GeojsonModule,
    ApnNurseryModule,
    FarmairModule,
    CaslModule,
    AtticaGreenModule,
    AtticadtModule,
    HipsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
