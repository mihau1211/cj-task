import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMeasurementDto } from 'src/measurement/dtos/create-measurement.dto';
import { MeasurementService } from 'src/measurement/measurement.service';

// WebSocket server doesn't contain any kind of authentication and security because of scope of task
// However, it is possible to authorize connection (JWT, OAuth, SSL)
@WebSocketGateway()
export class IotGateway {
    @WebSocketServer() server: Server;

    constructor(private measurementService: MeasurementService) { }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: any) {
        let message: string;

        try {
            const measurementDto: CreateMeasurementDto = JSON.parse(payload);
            await this.measurementService.create(measurementDto)
            message = 'Record saved successfully.';
            console.log(message);
            client.emit('success', message);
        } catch (err) {
            message = `Error occured during saving record: ${err.message}`;
            console.error(message);
            client.emit('error', message);
        }
    }
}
