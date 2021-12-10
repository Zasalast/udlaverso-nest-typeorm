module.exports = {
  type: 'postgres',
  url: 'postgres://user:password@host:port/database',
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations /*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.ts'
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
