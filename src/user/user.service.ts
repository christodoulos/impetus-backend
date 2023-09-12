import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      email,
      emailVerified: false,
    });

    return newUser.save();
  }

  async createGoogleUser(tokenPayload: TokenPayload): Promise<User> {
    const { sub, name, email, given_name, family_name, picture } = tokenPayload;
    const newUser = new this.userModel({
      id: sub,
      name,
      email,
      firstName: given_name,
      lastName: family_name,
      photoUrl: picture,
    });
    return newUser.save();
  }

  async updateGoogleUser(tokenPayload: TokenPayload): Promise<User> {
    const { sub, name, email, given_name, family_name, picture } = tokenPayload;
    const user = await this.userModel.findOne({ id: sub });
    user.name = name;
    user.email = email;
    user.firstName = given_name;
    user.lastName = family_name;
    user.photoUrl = picture;
    return user.save();
  }

  async findOne(id: string): Promise<User | undefined> {
    console.log('FINDING ONE', id);
    return this.userModel.findOne({ id }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id);
  }
}
