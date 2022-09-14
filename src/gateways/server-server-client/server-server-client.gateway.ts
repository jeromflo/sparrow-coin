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
export class ServerServerClientGateway {
  @WebSocketServer()
  server: Socket;
  /**
   * funcion destinada para la conexion de otros nodos de la red
   * @param payload  mensaje que se envia desde el cliente
   * @param client
   * @returns
   */
  @SubscribeMessage('server-client')
  serverClientSocket(
    @MessageBody() payload: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.write('recibido');
    console.log(payload);
    console.log({ http: client.client });
    client.emit(
      'data',
      JSON.stringify({
        data: { http: client.client },
      }),
    );

    client.emit('evento', { name: 'server-client' });
    return 'change de world!';
  }
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: unknown, @ConnectedSocket() client: Socket) {
    const event = 'events';
    console.log(data);
    console.log(client.handshake.address);

    this.server.emit('event', { event, data });
    return false;
  }
}
