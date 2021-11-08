import { NotificationMessage } from './data/notification-message';

export interface NotificationService {
  sendNotifications(message: NotificationMessage, tokens: string[]): Promise<void>;
}

const NotificationServiceType = Symbol.for('NotificationService');

export { NotificationServiceType };
