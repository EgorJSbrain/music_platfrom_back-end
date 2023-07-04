import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Track } from './schemas/track.schema';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(dto: CreateTrackDto) {
    const track = await this.trackModel.create({});
  }

  async getAll() {
    return '';
  }

  async getOne() {
    return '';
  }

  async delete() {
    return '';
  }
}
