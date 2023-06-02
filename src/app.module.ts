import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GeojsonModule } from './geojson/geojson.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/impetus-dev'),
    UserModule,
    AuthModule,
    GeojsonModule,
  ],
})
export class AppModule {}
