import { TransaccionORMService } from './../../../shared/orm/transaccion/transaccion.orm.service';
import { Trx } from 'src/model/trx';
import { DatabaseService } from './../../../shared/model-database/database/database.service';
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
export class RealizarTransaccionGateway {
  @WebSocketServer()
  server: Socket;
  constructor(private ormTransaccionService: TransaccionORMService) {}
  @SubscribeMessage('create-transaccion')
  handleEvent(@MessageBody() data: any): WsResponse<unknown> {
    const event = 'create-transaccion';
    console.log(data);
    console.log(typeof data);
    console.log(data.cant);

    if (typeof data !== 'object') {
      this.server.emit('transaccion', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      const trx = new Trx(
        data.cant,
        data.addressDest,
        data.addresOrigin,
        data.caducidad,
      );
      this.ormTransaccionService.insertTransacction(trx);
      /*     this.databaseService.addTrx(trx);
       */
      this.server.emit('transaccion', { event, data });
    }
    return { event, data };
  }
}
