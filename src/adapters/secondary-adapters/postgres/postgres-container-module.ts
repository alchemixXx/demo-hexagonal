import { ContainerModule, interfaces } from 'inversify';
import { UserEntityConverter } from './user/converters/user-entity-converter';
import {
  UserRepository,
  UserRepositoryType,
} from '../../../core/component/user/port/user-repository';
import { UserRepositoryAdapter } from './user/repository/user-repository-adapter';

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(UserEntityConverter).toSelf();
    bind<UserRepository>(UserRepositoryType).to(UserRepositoryAdapter);
  },
);
