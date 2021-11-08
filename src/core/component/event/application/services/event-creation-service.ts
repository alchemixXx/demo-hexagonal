import { EventRepository, EventRepositoryType } from '../../port/event-repository';
import { inject, injectable } from 'inversify';
import { EventResponse } from '../data/output/event-response';
import { EventCreationInput } from '../data/input/event-creation-input';
import { EventReminderService } from './event-reminder-service';
import { Event } from '../../domain/data/event';
import { Converter } from '../../../../shared-kernel/interfaces/converter';
import { EventConverter } from './converters/event-converter';

@injectable()
export class EventCreationService {
  private eventRepo: EventRepository;
  private reminderService: EventReminderService;
  private eventConverter: Converter<Event, EventResponse>;

  constructor(
    @inject(EventRepositoryType) eventRepo: EventRepository,
    @inject(EventReminderService) reminderService: EventReminderService,
    @inject(EventConverter) eventConverter: Converter<Event, EventResponse>,
  ) {
    this.eventRepo = eventRepo;
    this.reminderService = reminderService;
    this.eventConverter = eventConverter;
  }

  public async createEvent(
    input: EventCreationInput,
    actionUserId: number,
  ): Promise<EventResponse> {
    const newEvent = Event.fromObject({
      ...input,
      creatorId: actionUserId,
    });

    const savedEvent = await this.eventRepo.save(newEvent);

    await this.reminderService.setupReminder(savedEvent);

    return this.eventConverter.from(savedEvent);
  }
}
