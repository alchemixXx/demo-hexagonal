import { chai } from '../base';
import mocks, { resetAllMocks } from '../../common/mocks';
import { deepEqual, instance, when } from 'ts-mockito';
import { UserRegistrationService } from '../../../src/core/component/user/application/services/user-registration-service';
import { UserConverter } from '../../../src/core/component/user/application/services/converters/user-converter';
import { User } from '../../../src/core/component/user/domain/data/user';
import { DEFAULT_USER } from '../../common/construction-objects';

describe('user registration service tests', () => {
  let userService: UserRegistrationService;
  const userRepoMock = mocks.postgres.user.userRepositoryMock;

  before(async () => {
    userService = new UserRegistrationService(instance(userRepoMock), new UserConverter());
  });

  afterEach(() => {
    resetAllMocks();
  });

  it('should register user', async () => {
    const testUserId = 1;
    const testUser = User.fromObject({
      ...DEFAULT_USER,
      id: testUserId,
    });
    const input = {
      phone: DEFAULT_USER.phone,
      username: DEFAULT_USER.username,
    };

    when(userRepoMock.findByUsername(input.username)).thenResolve(null);
    when(userRepoMock.save(deepEqual(User.fromObject({ ...input })))).thenResolve(testUser);

    const response = await userService.registerUser(input);

    chai.expect(response.id).to.eql(testUserId);
  });
});
