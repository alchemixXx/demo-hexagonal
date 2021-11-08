import { inject, injectable } from 'inversify';
import { BaseTypeORMRepository } from '../../common/base-type-orm-repository';
import { UserEntity } from '../data/user-entity';
import { Converter } from '../../../../../core/shared-kernel/interfaces/converter';
import { UserRepository } from '../../../../../core/component/user/port/user-repository';
import { User } from '../../../../../core/component/user/domain/data/user';
import { UserEntityConverter } from '../converters/user-entity-converter';

@injectable()
export class UserRepositoryAdapter
  extends BaseTypeORMRepository<UserEntity>
  implements UserRepository
{
  private entityConverter: Converter<UserEntity, User>;

  constructor(@inject(UserEntityConverter) entityConverter: Converter<UserEntity, User>) {
    super(UserEntity);
    this.entityConverter = entityConverter;
  }

  public async save(event: User): Promise<User> {
    const entity = this.entityConverter.to(event);
    const savedEntity = await this.repository.save(entity);
    return this.entityConverter.from(savedEntity);
  }

  public async findById(id: number): Promise<User | null> {
    const maybeEntity = await this.repository.findOne({ where: { id } });
    return maybeEntity ? this.entityConverter.from(maybeEntity) : null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const maybeEntity = await this.repository.findOne({ where: { username } });
    return maybeEntity ? this.entityConverter.from(maybeEntity) : null;
  }
}
