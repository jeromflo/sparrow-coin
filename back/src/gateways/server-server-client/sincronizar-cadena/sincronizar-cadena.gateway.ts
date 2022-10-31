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
export class SincronizarCadenaGateway {
  @WebSocketServer()
  server: Socket;
  @SubscribeMessage('sync-chain')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'sync-chain';

    this.server.emit('sync', { event, data });
    return { event, data };
  }
}
