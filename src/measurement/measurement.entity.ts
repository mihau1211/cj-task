import { IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";


// I decided to store temperature and humidity in a single record because of that most of sensors collects data for both temp and hum
// However, if it will be necessary, it could be split into separate documents(tables) or rows
// UoM added for both temp and hum because it wasn't specified if sensors will return values with the same units
@Entity()
export class Measurement {
    @ObjectIdColumn()
    _id: ObjectId;

    @IsString()
    @Column({ nullable: false })
    sensorId: string;

    // timestamp will be stored as numerical value of milliseconds
    @IsNumber()
    @Column('double', { nullable: false })
    timestamp: number;

    // IsOptional decorator is added to allow to add null values to db. In this case, it could give an information that for sensor x at timestamp y something went wrong
    // and could be usefull for finding vulnerabilities
    @IsNumber()
    @IsOptional()
    @Column()
    temperature: number | null;

    @IsString()
    @Column({ nullable: false })
    temperatureUoM: string;

    // IsOptional decorator is added to allow to add null values to db. In this case, it could give an information that for sensor x at timestamp y something went wrong
    // and could be usefull for finding vulnerabilities
    @IsNumber()
    @IsOptional()
    @Column()
    humidity: number | null;

    @IsString()
    @Column({ nullable: false })
    humidityUoM: string;
}