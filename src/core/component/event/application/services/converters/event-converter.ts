import { Converter } from '../../../../../shared-kernel/interfaces/converter';
import { EventResponse } from '../../data/output/event-response';
import { injectable } from 'inversify';
import { Event } from '../../../domain/data/event';

@injectable()
export class EventConverter implements Converter<Event, EventResponse> {
  from(from: Event): EventResponse {
    return EventResponse.fromObject({ ...from });
  }

  to(to: EventResponse): Event {
    return EventResponse.fromObject({ ...to });
  }
}
