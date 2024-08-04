import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const appPort = configService.get<number>('APP_PORT');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )
    await app.listen(appPort);
}
bootstrap();
