import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway(15600, { cors: true })
export class PrincipalGateway {
  @WebSocketServer()
  server: Socket;
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    this.server.emit('message', data + 'recibido');
    return data;
  }
}
