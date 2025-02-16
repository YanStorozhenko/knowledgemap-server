import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'knowledge_map',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
