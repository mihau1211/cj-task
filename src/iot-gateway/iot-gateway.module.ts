import { Module } from '@nestjs/common';
import { IotGateway } from './iot.gateway';
import { MeasurementService } from 'src/measurement/measurement.service';
import { MeasurementModule } from 'src/measurement/measurement.module';

@Module({
    imports: [MeasurementModule],
    providers: [IotGateway, MeasurementService],
    exports: [IotGateway]
})
export class IotGatewayModule {}