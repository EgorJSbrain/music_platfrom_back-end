import { Controller, Get } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  create() {
    return 'TRACKS';
  }

  @Get()
  getAll() {
    return 'TRACKS';
  }

  getOne() {
    return 'TRACKS';
  }

  delete() {
    return 'TRACKS';
  }
}
