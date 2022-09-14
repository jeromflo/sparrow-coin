import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway(15500)
export class ClientFrontGateway {
  @WebSocketServer()
  server: Socket;
  /**
   * funcion que se ejecuta cuando se conecta un cliente front
   * @param payload
   * @param client
   * @returns
   */
  @SubscribeMessage('client')
  clientSocket(
    @MessageBody() payload: string,
    @ConnectedSocket() client: Socket,
  ): string {
    /*     console.log(client);
     */
    client.write('recibido');
    console.log(payload);
    console.log(client);
    client.emit('message', { name: 'Nest' });
    client.emit('evento', { name: 'Nest' });

    return 'change de world!';
  }
}
