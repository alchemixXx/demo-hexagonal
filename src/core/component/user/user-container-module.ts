import { ContainerModule, interfaces } from 'inversify';
import { UserNotificationService } from './application/services/user-notification-service';
import { UserRegistrationService } from './application/services/user-registration-service';
import { UserConverter } from './application/services/converters/user-converter';

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(UserConverter).toSelf();
    bind(UserNotificationService).toSelf();
    bind(UserRegistrationService).toSelf();
  },
);
