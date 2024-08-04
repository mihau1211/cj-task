import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMeasurementDto {
    @IsString()
    @IsNotEmpty()
    sensorId: string

    @IsNumber()
    @IsNotEmpty()
    timestamp: number

    @IsNumber()
    @IsOptional()
    temperature: number

    @IsString()
    @IsNotEmpty()
    temperatureUoM: string

    @IsNumber()
    @IsOptional()
    humidity: number

    @IsString()
    @IsNotEmpty()
    humidityUoM: string
}