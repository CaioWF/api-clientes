import { Connection, createConnection } from 'typeorm';

import ormConfig from '../../../../ormconfig';

export default async (): Promise<Connection> => {
  const host =
    (process.env.NODE_ENV === 'dev' && 'database_clientes') ||
    ('host' in ormConfig && ormConfig.host) ||
    'localhost';

  return createConnection(Object.assign(ormConfig, { host }));
};
