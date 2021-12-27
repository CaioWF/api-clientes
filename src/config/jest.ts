export default async () => {
  process.env.DB_HOST = 'localhost';
  process.env.DB_PORT = '5433';
  process.env.DB_USERNAME = 'docker';
  process.env.DB_PASSWORD = 'clientes';
  process.env.DB_NAME = 'clientes_test';
};
