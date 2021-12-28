import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { MomentDateProvider } from './DateProvider/implementations/MomentDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', MomentDateProvider);
