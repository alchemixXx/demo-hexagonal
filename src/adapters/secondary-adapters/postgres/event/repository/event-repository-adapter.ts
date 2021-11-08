import { EventRepository } from '../../../../../core/component/event/port/event-repository';
import { Event } from '../../../../../core/component/event/domain/data/event';
import { inject, injectable } from 'inversify';
import { BaseTypeORMRepository } from '../../common/base-type-orm-repository';
import { EventEntity } from '../data/event-entity';
import { Converter } from '../../../../../core/shared-kernel/interfaces/converter';
import { EventEntityConverter } from '../converters/event-entity-converter';
import { Between } from 'typeorm';

@injectable()
export class EventRepositoryAdapter
  extends BaseTypeORMRepository<EventEntity>
  implements EventRepository
{
  private entityConverter: Converter<EventEntity, Event>;

  constructor(@inject(EventEntityConverter) entityConverter: Converter<EventEntity, Event>) {
    super(EventEntity);
    this.entityConverter = entityConverter;
  }

  public async findByCreator(creatorId: number): Promise<Event[]> {
    const entities = await this.repository.find({ where: { creatorId } });
    return entities.map((entity) => this.entityConverter.from(entity));
  }

  public async findById(id: number): Promise<Event | null> {
    const maybeEntity = await this.repository.findOne({ where: { id } });
    return maybeEntity ? this.entityConverter.from(maybeEntity) : null;
  }

  public async findByStartDateRange(dateFrom: Date, dateTo: Date): Promise<Event[]> {
    const entities = await this.repository.find({
      where: { startDate: Between(dateFrom, dateTo) },
    });
    return entities.map((entity) => this.entityConverter.from(entity));
  }

  public async save(event: Event): Promise<Event> {
    const entity = this.entityConverter.to(event);
    const savedEntity = await this.repository.save(entity);
    return this.entityConverter.from(savedEntity);
  }
}
