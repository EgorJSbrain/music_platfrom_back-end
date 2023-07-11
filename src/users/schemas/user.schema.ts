import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop()
  banned: boolean;

  @Prop()
  banReason: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: any[]; // TO DO add roles

  // TO DO add posts
  // TO DO add tracks
}

export const UserSchema = SchemaFactory.createForClass(User);
