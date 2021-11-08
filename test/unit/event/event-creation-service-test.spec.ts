import { Event } from '../../../src/core/component/event/domain/data/event';
import { DEFAULT_EVENT } from '../../common/construction-objects';
import mocks, { resetAllMocks } from '../../common/mocks';
import { chai } from '../base';
import { EventCreationService } from '../../../src/core/component/event/application/services/event-creation-service';
import { deepEqual, instance, mock, reset, verify, when } from 'ts-mockito';
import { EventReminderService } from '../../../src/core/component/event/application/services/event-reminder-service';
import { EventConverter } from '../../../src/core/component/event/application/services/converters/event-converter';

describe('event creation service tests', () => {
  let eventService: EventCreationService;
  const eventRepoMock = mocks.postgres.event.eventRepositoryMock;
  const reminderServiceMock = mock(EventReminderService);

  before(async () => {
    eventService = new EventCreationService(
      instance(eventRepoMock),
      instance(reminderServiceMock),
      new EventConverter(),
    );
  });

  afterEach(() => {
    resetAllMocks();
    reset(reminderServiceMock);
  });

  it('should create event', async () => {
    const testUserId = 1;
    const testEventId = 2;
    const testEvent = Event.fromObject({
      ...DEFAULT_EVENT,
      id: testEventId,
    });
    const input = {
      title: DEFAULT_EVENT.title,
      startDate: DEFAULT_EVENT.startDate,
      endDate: DEFAULT_EVENT.endDate,
      eventType: DEFAULT_EVENT.eventType,
    };

    when(
      eventRepoMock.save(
        deepEqual(
          Event.fromObject({
            ...input,
            creatorId: testUserId,
          }),
        ),
      ),
    ).thenResolve(testEvent);

    const response = await eventService.createEvent(input, testUserId);

    chai.expect(response.id).to.eql(testEvent.id);
    verify(reminderServiceMock.setupReminder(deepEqual(testEvent))).once();
  });
});
