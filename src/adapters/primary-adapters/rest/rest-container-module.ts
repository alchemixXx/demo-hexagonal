import { ContainerModule, interfaces } from 'inversify';
import { UserController } from './user/user-controller';
import { HttpErrorHandler } from './common/http-error-handlers';

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(UserController).toSelf();
    bind(HttpErrorHandler).toSelf();
  },
);
