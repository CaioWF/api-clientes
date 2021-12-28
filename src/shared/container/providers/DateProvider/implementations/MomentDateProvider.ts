import moment from 'moment';

import { IDateProvider } from '../IDateProvider';

class MomentDateProvider implements IDateProvider {
  getAge(dateOfBirth: Date): number {
    return moment().diff(dateOfBirth, 'years');
  }
}

export { MomentDateProvider };
