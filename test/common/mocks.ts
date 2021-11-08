import { mock, reset } from 'ts-mockito';
import { EventRepositoryAdapter } from '../../src/adapters/secondary-adapters/postgres/event/repository/event-repository-adapter';
import { UserRepositoryAdapter } from '../../src/adapters/secondary-adapters/postgres/user/repository/user-repository-adapter';
import { FCMNotificationAdapter } from '../../src/adapters/secondary-adapters/notification/fmc-notification-adapter';
import * as R from 'ramda';

const mocks = {
  postgres: {
    user: {
      userRepositoryMock: mock(UserRepositoryAdapter),
    },
    event: {
      eventRepositoryMock: mock(EventRepositoryAdapter),
    },
  },
  fcm: {
    fcmServiceAdapter: mock(FCMNotificationAdapter),
  },
};

export default mocks;

export function resetAllMocks() {
  const mockPaths = [
    ['postgres', 'user', 'userRepositoryMock'],
    ['postgres', 'event', 'eventRepositoryMock'],
    ['fcm', 'fcmServiceAdapter'],
  ];
  // @ts-ignore
  const valuesFromPath = R.curry((paths, obj) => R.ap([R.path(R.__, obj)], paths));
  valuesFromPath(mockPaths, mocks).forEach(reset);
}
