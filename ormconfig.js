module.exports = {
  type: 'postgres',
  url: 'postgres://root:123456@localhost:5432/my_store_db',
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