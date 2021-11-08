import { inject, injectable } from 'inversify';
import { UserRepository, UserRepositoryType } from '../../port/user-repository';
import { Converter } from '../../../../shared-kernel/interfaces/converter';
import { User } from '../../domain/data/user';
import { UserConverter } from './converters/user-converter';
import { UserResponse } from '../data/output/user-response';
import { UserRegistrationInput } from '../data/input/user-registration-input';
import { BadRequest } from '../../../../shared-kernel/exceptions/bad-request';

@injectable()
export class UserRegistrationService {
  private userRepo: UserRepository;
  private userConverter: Converter<User, UserResponse>;

  constructor(
    @inject(UserRepositoryType) userRepo: UserRepository,
    @inject(UserConverter) userConverter: Converter<User, UserResponse>,
  ) {
    this.userRepo = userRepo;
    this.userConverter = userConverter;
  }

  public async registerUser(input: UserRegistrationInput): Promise<UserResponse> {
    const userWithUsername = await this.userRepo.findByUsername(input.username);

    if (userWithUsername) throw new BadRequest('Username already exists');

    const newUser = User.fromObject({
      ...input,
    });

    const user = await this.userRepo.save(newUser);

    return this.userConverter.from(user);
  }
}
