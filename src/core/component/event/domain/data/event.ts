import { EventType } from './event-type';

interface EventBuilderObj {
  id?: number;
  title: string;
  startDate: Date;
  endDate: Date;
  creatorId: number;
  eventType: EventType;
  createdAt?: Date;
}

export class Event {
  id: number | null;

  title: string;

  startDate: Date;

  endDate: Date;

  creatorId: number;

  eventType: EventType;

  createdAt: Date | null;

  public static fromObject(builder: EventBuilderObj): Event {
    const event = new Event();
    event.id = builder.id || null;
    event.title = builder.title;
    event.startDate = builder.startDate;
    event.endDate = builder.endDate;
    event.creatorId = builder.creatorId;
    event.eventType = builder.eventType;
    event.createdAt = builder.createdAt || null;
    return event;
  }
}
