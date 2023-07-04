import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      `mongodb+srv://user:user@cluster0.igskz4u.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
})
export class AppModule {}
