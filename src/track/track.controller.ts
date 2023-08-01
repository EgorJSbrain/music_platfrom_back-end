import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';

@Controller('/tracks')
export class TrackController {
  constructor(private trackSevice: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;

    return this.trackSevice.create(dto, picture[0], audio[0]);
  }

  @Get('/search/')
  search(@Query('query') query: string) {
    return this.trackSevice.search(query);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackSevice.getAll(count, offset);
  }

  @Get('/by-user/:userId')
  getByUserId(@Param('userId') userId: string) {
    return this.trackSevice.getByUserId(userId);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackSevice.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackSevice.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackSevice.createComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackSevice.listen(id);
  }
}
