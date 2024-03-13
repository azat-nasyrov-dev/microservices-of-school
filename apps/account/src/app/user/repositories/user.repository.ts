import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../models/user.model';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  public async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  public async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  public async deleteUserByEmail(email: string) {
    return await this.userModel.deleteOne({ email }).exec();
  }
}
