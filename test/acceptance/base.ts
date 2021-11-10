import 'reflect-metadata';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import AppInitializer from '../../src/app-initializer';
import { Application } from 'express';
import { Container } from 'inversify';
import * as PostgresConnection from '../../src/adapters/secondary-adapters/postgres/connection';
import mocks, { resetAllMocks } from '../common/mocks';
import { instance } from 'ts-mockito';
import chaiHttp = require('chai-http');
import {
  UserRepository,
  UserRepositoryType,
} from '../../src/core/component/user/port/user-repository';
import {
  NotificationService,
  NotificationServiceType,
} from '../../src/core/port/notification/notification-service';
import { SinonFakeTimers } from 'sinon'; // tslint:disable-line

chai.use(chaiHttp);

export { chai };

export class AcceptanceSetupManager {
  private stubs: SinonStub[];
  public clock: SinonFakeTimers;

  public async beforeAcceptance(): Promise<Application> {
    this.stubs = [sinon.stub(PostgresConnection, 'createConnectionPool')];

    await AppInitializer.initialize();
    this.mockPostgresAdapters(AppInitializer.diContainer);
    this.mockFCM(AppInitializer.diContainer);

    this.clock = sinon.useFakeTimers();

    return AppInitializer.app;
  }

  public afterAcceptance() {
    this.stubs.forEach((stub) => stub.restore());
  }

  public afterEachAcceptance() {
    this.clock.restore();
    resetAllMocks();
  }

  private mockPostgresAdapters(container: Container): void {
    // User
    container
      .rebind<UserRepository>(UserRepositoryType)
      .toConstantValue(instance(mocks.postgres.user.userRepositoryMock));
  }

  private mockFCM(container: Container): void {
    container
      .rebind<NotificationService>(NotificationServiceType)
      .toConstantValue(instance(mocks.fcm.fcmServiceAdapter));
  }
}
