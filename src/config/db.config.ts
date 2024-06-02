import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EveryEventSubscriber } from 'src/subscribers/every.event.subscriber';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('DB_TYPE'),
      synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
      database: this.configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
      logging: JSON.parse(this.configService.get<string>('LOGGING')),
      subscribers: [EveryEventSubscriber],
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASS'),
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
