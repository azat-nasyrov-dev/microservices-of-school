import { Document, Types } from 'mongoose';
import { IUser, IUserCourses, PurchaseState, UserRole } from '@microservices-of-school/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModelCourses extends Document implements IUserCourses {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true, enum: PurchaseState, type: String })
  purchaseState: PurchaseState;
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserModelCourses);

@Schema()
export class UserModel extends Document implements IUser {
  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String, default: UserRole.Student })
  role: UserRole;

  @Prop({ type: [UserCoursesSchema], _id: false })
  courses: Types.Array<UserModelCourses>
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
