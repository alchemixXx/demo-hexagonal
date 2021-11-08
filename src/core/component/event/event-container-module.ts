import { ContainerModule, interfaces } from 'inversify';
import { EventConverter } from './application/services/converters/event-converter';
import { EventCreationInput } from './application/data/input/event-creation-input';
import { EventCreationService } from './application/services/event-creation-service';
import { EventQueryService } from './application/services/event-query-service';
import { EventReminderService } from './application/services/event-reminder-service';

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(EventConverter).toSelf();
    bind(EventCreationService).toSelf();
    bind(EventQueryService).toSelf();
    bind(EventReminderService).toSelf();
  },
);
