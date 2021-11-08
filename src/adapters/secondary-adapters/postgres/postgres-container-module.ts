import { ContainerModule, interfaces } from 'inversify';
import { EventEntityConverter } from './event/converters/event-entity-converter';
import {
  EventRepository,
  EventRepositoryType,
} from '../../../core/component/event/port/event-repository';
import { EventRepositoryAdapter } from './event/repository/event-repository-adapter';
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
    bind(EventEntityConverter).toSelf();
    bind<EventRepository>(EventRepositoryType).to(EventRepositoryAdapter);

    bind(UserEntityConverter).toSelf();
    bind<UserRepository>(UserRepositoryType).to(UserRepositoryAdapter);
  },
);
