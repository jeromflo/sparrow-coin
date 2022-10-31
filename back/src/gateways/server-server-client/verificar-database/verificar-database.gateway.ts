import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway(15600)
@WebSocketGateway()
export class VerificarDatabaseGateway {
  @WebSocketServer()
  server: Socket;
  @SubscribeMessage('verify-database')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'verify-database';

    this.server.emit('verify_my_database', { event, data });
    return { event, data };
  }
}
