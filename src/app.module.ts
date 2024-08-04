import { Module } from '@nestjs/common';
import { MeasurementModule } from './measurement/measurement.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement/measurement.entity';
import { IotGatewayModule } from './iot-gateway/iot-gateway.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mongodb',
                url: configService.get<string>('DATABASE_URL'),
                entities: [Measurement],
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        MeasurementModule,
        IotGatewayModule
    ]
})
export class AppModule { }
