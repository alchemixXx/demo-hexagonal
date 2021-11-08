import { injectable } from 'inversify';
import { Converter } from '../../../../../core/shared-kernel/interfaces/converter';
import { UserEntity } from '../data/user-entity';
import { User } from '../../../../../core/component/user/domain/data/user';

@injectable()
export class UserEntityConverter implements Converter<UserEntity, User> {
  from(from: UserEntity): User {
    return User.fromObject({ ...from });
  }

  to(to: User): UserEntity {
    return UserEntity.fromObject({ ...to });
  }
}
