import { Converter } from '../../../../../shared-kernel/interfaces/converter';
import { UserResponse } from '../../data/output/user-response';
import { User } from '../../../domain/data/user';
import { injectable } from 'inversify';

@injectable()
export class UserConverter implements Converter<User, UserResponse> {
  from(from: User): UserResponse {
    return UserResponse.fromObject({
      phone: from.phone,
      id: from.id,
      username: from.username,
    });
  }

  to(to: UserResponse): User {
    throw new Error('Cannot be implemented');
  }
}
