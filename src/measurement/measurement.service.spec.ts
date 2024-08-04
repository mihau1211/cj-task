import { Test } from '@nestjs/testing';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { BadRequestException } from '@nestjs/common';

describe('MeasurementService', () => {
    const id = new ObjectId('123456789012345678901234')
    const sensorId = '123456';
    const timestamp = 1722699721244;
    const temperature = 26.5;
    const temperatureUoM = "C";
    const humidity = 67;
    const humidityUoM = "%";

    let service: MeasurementService;
    let fakeMeasurementRepository;

    beforeEach(async () => {
        fakeMeasurementRepository = {
            save: jest.fn().mockImplementation((measurement) => Promise.resolve({ _id: id, ...measurement })),
            create: jest.fn().mockImplementation((measurement) => measurement)
        }

        const module = await Test.createTestingModule({
            providers: [
                MeasurementService,
                {
                    provide: getRepositoryToken(Measurement),
                    useValue: fakeMeasurementRepository
                }
            ],
        }).compile();

        service = module.get<MeasurementService>(MeasurementService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should correctly create measurement record', async () => {
        const measurement = await service.create({ sensorId, timestamp, temperature, temperatureUoM, humidity, humidityUoM });

        expect(measurement._id).toBeDefined();
        expect(measurement.sensorId).toEqual(sensorId);
        expect(measurement.timestamp).toEqual(timestamp);
        expect(measurement.temperature).toEqual(temperature);
        expect(measurement.temperatureUoM).toEqual(temperatureUoM);
        expect(measurement.humidity).toEqual(humidity);
        expect(measurement.humidityUoM).toEqual(humidityUoM);
    })

    it('should correctly create measurement record with null values for temperature', async () => {
        const measurement = await service.create({ sensorId, timestamp, temperature: null, temperatureUoM, humidity, humidityUoM });

        expect(measurement._id).toBeDefined();
        expect(measurement.sensorId).toEqual(sensorId);
        expect(measurement.timestamp).toEqual(timestamp);
        expect(measurement.temperature).toEqual(null);
        expect(measurement.temperatureUoM).toEqual(temperatureUoM);
        expect(measurement.humidity).toEqual(humidity);
        expect(measurement.humidityUoM).toEqual(humidityUoM);
    })

    it('should correctly create measurement record with null values for humidity', async () => {
        const measurement = await service.create({ sensorId, timestamp, temperature, temperatureUoM, humidity: null, humidityUoM });

        expect(measurement._id).toBeDefined();
        expect(measurement.sensorId).toEqual(sensorId);
        expect(measurement.timestamp).toEqual(timestamp);
        expect(measurement.temperature).toEqual(temperature);
        expect(measurement.temperatureUoM).toEqual(temperatureUoM);
        expect(measurement.humidity).toEqual(null);
        expect(measurement.humidityUoM).toEqual(humidityUoM);
    })

    it('should throw an exception for incorrect timestamp', async () => {
        await expect(service.create({ sensorId, timestamp: 1111111111111111111111, temperature, temperatureUoM, humidity, humidityUoM })).rejects.toThrow(
            BadRequestException
        );
    })
});
