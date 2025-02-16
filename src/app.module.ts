import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Підключаємо ConfigModule, щоб читати змінні з .env
    ConfigModule.forRoot({
      isGlobal: true, // Доступність у всьому додатку
    }),

    // Підключаємо TypeORM асинхронно, щоб отримувати змінні з ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Підключення всіх ентиті
        synchronize: false, // Вимикаємо автоматичне створення таблиць (використовуємо міграції)
        logging: true, // Логування SQL-запитів
        ssl: configService.get<boolean>('DB_SSL')
            ? { ca: configService.get<string>('DB_CA_PATH'), rejectUnauthorized: false }
            : undefined,

      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
