import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Measurement])],
    providers: [
        MeasurementService
    ],
    exports: [MeasurementService, TypeOrmModule]
})
export class MeasurementModule { }
