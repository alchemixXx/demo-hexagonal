import { EventType } from '../../../domain/data/event-type';
import { IsDate, IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { TransformToDate } from '../../../../../shared-kernel/annotations/transformers';

export class EventCreationInput {
  @IsString()
  title: string;

  @IsDate()
  @TransformToDate
  startDate: Date;

  @IsDate()
  @TransformToDate
  endDate: Date;

  @IsEnum(EventType)
  eventType: EventType;
}
