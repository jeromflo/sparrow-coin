import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'net';

@WebSocketGateway(15600)
export class PrincipalGateway {
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() payload: string,
    @ConnectedSocket() client: Socket,
  ): string {
    /*     console.log(client);
     */
    client.write('recibido');
    console.log(payload);
    console.log(client.remoteAddress);
    client.emit('message', { name: 'Nest' });
    client.emit('evento', { name: 'Nest' });

    return 'change de world!';
  }
}
