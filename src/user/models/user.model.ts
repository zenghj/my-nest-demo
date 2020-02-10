import { prop, getModelForClass } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { ModelType } from '@typegoose/typegoose/lib/types';

export class User {
  @prop({
    required: [true, 'username is required'],
    unique: true,
    minlength: [6, 'Must be at least 6 characters'],
  })
  @Expose()
  username: string;

  @prop({
    required: [true, 'Password is required'],
    minlength: [6, 'Must be at least 6 characters'],
  })
  @Expose()
  password: string;

  static get model(): ModelType<User> {
    return getModelForClass(User);
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel() {
    return new this.model();
  }
}
