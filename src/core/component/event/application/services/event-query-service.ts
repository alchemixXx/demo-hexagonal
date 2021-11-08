import { inject, injectable } from 'inversify';
import { EventRepository, EventRepositoryType } from '../../port/event-repository';
import { EventResponse } from '../data/output/event-response';
import { NotFound } from '../../../../shared-kernel/exceptions/not-found';
import { Forbidden } from '../../../../shared-kernel/exceptions/forbidden';
import { Converter } from '../../../../shared-kernel/interfaces/converter';
import { EventConverter } from './converters/event-converter';
import { Event } from '../../domain/data/event';

@injectable()
export class EventQueryService {
  private eventRepo: EventRepository;
  private eventConverter: Converter<Event, EventResponse>;

  constructor(
    @inject(EventRepositoryType) eventRepo: EventRepository,
    @inject(EventConverter) eventConverter: Converter<Event, EventResponse>,
  ) {
    this.eventRepo = eventRepo;
    this.eventConverter = eventConverter;
  }

  public async getEventById(eventId: number, actionUserId: number): Promise<EventResponse> {
    const event = await this.eventRepo.findById(eventId);
    if (!event) throw new NotFound('No such event');

    if (event.creatorId !== actionUserId) throw new Forbidden('Only creator can access event');

    return this.eventConverter.from(event);
  }

  public async getEventsCreatedByUser(actionUserId: number): Promise<EventResponse[]> {
    const events = await this.eventRepo.findByCreator(actionUserId);

    return events.map((event) => this.eventConverter.from(event));
  }
}
