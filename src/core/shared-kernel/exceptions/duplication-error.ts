import { BadRequest } from './bad-request';

export class DuplicationError extends BadRequest {
  constructor(message: string = 'Already exists') {
    super(message);
    Object.setPrototypeOf(this, DuplicationError.prototype);
  }
}
