import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_clientes'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions('default');
  return createConnection(Object.assign(defaultOptions, { host }));
};
