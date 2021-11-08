import { ContainerModule, interfaces } from 'inversify';
import {
  NotificationService,
  NotificationServiceType,
} from '../../../core/port/notification/notification-service';
import { FCMNotificationAdapter } from './fmc-notification-adapter';

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind<NotificationService>(NotificationServiceType).to(FCMNotificationAdapter);
  },
);
