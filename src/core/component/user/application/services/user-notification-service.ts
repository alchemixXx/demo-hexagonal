import { inject, injectable } from 'inversify';
import { UserRepository, UserRepositoryType } from '../../port/user-repository';
import { NotFound } from '../../../../shared-kernel/exceptions/not-found';
import { Converter } from '../../../../shared-kernel/interfaces/converter';
import { User } from '../../domain/data/user';
import { UserResponse } from '../data/output/user-response';
import { UserConverter } from './converters/user-converter';

@injectable()
export class UserNotificationService {
  private userRepo: UserRepository;
  private userConverter: Converter<User, UserResponse>;

  constructor(
    @inject(UserRepositoryType) userRepo: UserRepository,
    @inject(UserConverter) userConverter: Converter<User, UserResponse>,
  ) {
    this.userRepo = userRepo;
    this.userConverter = userConverter;
  }

  public async addNotificationToken(token: string, actionUserId: number): Promise<UserResponse> {
    const user = await this.userRepo.findById(actionUserId);

    if (!user) throw new NotFound('No such user');

    const setOfTokens = new Set(user.notificationTokens);
    setOfTokens.add(token);
    user.notificationTokens = [...setOfTokens];

    const savedUser = await this.userRepo.save(user);

    return this.userConverter.from(savedUser);
  }
}
