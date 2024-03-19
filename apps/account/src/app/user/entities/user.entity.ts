import {
  IDomainEvent,
  IUser,
  IUserCourses,
  PurchaseState,
  UserRole
} from '@microservices-of-school/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { AccountChangedCourse } from '@microservices-of-school/contracts';

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];
  events: IDomainEvent[] = [];

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.courses = user.courses;
  }

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find(c => c.courseId === courseId);

    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: state,
      });

      return this;
    }

    if (state === PurchaseState.Cancelled) {
      this.courses = this.courses.filter(c => c.courseId!== courseId);
      return this;
    }

    this.courses = this.courses.map(c => {
      if (c.courseId=== courseId) {
        c.purchaseState = state;
        return c;
      }

      return c;
    });

    this.events.push({
      topic: AccountChangedCourse.topic,
      data: { courseId, userId: this._id, state }
    });
    return this;
  }

  public getPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async validatePassword(password: string) {
    return await compare(password, this.passwordHash);
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
