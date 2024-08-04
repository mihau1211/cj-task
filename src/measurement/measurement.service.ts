import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from './measurement.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { CreateMeasurementDto } from './dtos/create-measurement.dto';

@Injectable()
export class MeasurementService {
    constructor(@InjectRepository(Measurement) private repo: Repository<Measurement>) { }

    async create(measurementDto: CreateMeasurementDto) {
        const measurement = this.repo.create(measurementDto);

        const errors = await validate(measurement);

        if (errors.length) {
            errors.forEach(error => {
                console.log(`Property: ${error.property}`);
                console.log(`Value: ${error.value}`);
                console.log(`Constraints: ${JSON.stringify(error.constraints)}`);
            });
            throw new BadRequestException('provided input is incorrect');
        }

        // In this approach, prividing correct timestamp is required, but it is possible to create timestamp as new Date().getTime() if incorrect/not provided
        let date = new Date(measurement.timestamp);
        if (!date || !date.getTime()) {
            throw new BadRequestException('provided timestamp is incorrect');
        }

        return await this.repo.save(measurement);
    }

    @Get()
    async findAll() {
        return await this.repo.find();
    }
}
