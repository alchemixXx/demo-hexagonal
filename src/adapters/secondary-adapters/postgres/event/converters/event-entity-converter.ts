import { Converter } from '../../../../../core/shared-kernel/interfaces/converter';
import { Event } from '../../../../../core/component/event/domain/data/event';
import { EventEntity } from '../data/event-entity';
import { injectable } from 'inversify';

@injectable()
export class EventEntityConverter implements Converter<EventEntity, Event> {
  from(from: EventEntity): Event {
    return Event.fromObject({
      ...from,
    });
  }

  to(to: Event): EventEntity {
    return EventEntity.fromObject({
      ...to,
    });
  }
}
