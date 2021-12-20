export const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgresql',
  database: 'postgres',
  entities: ['dist/src/gateway/**/entities/*.{.ts,.js}'],
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/migration/*.ts'],
  cli: {
    migrationsDir: 'migration/',
  },
  synchronize: true,
};
