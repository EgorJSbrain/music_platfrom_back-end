import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as path from 'path';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      `mongodb+srv://user:user@cluster0.igskz4u.mongodb.net/?retryWrites=true&w=majority`,
    ),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
