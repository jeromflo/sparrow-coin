import { Address } from '../../../model/address';
import { TransaccionORMService } from '../../../shared/orm/transaccion/transaccion.orm.service';
import { Trx } from 'src/model/trx';
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
export class GetTransaccionGateway {
  @WebSocketServer()
  server: Socket;
  constructor(private ormTransaccionService: TransaccionORMService) {}

  @SubscribeMessage('create-transaccion')
  handleEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    const event = 'create-transaccion';
    console.log(data);
    if (typeof data !== 'object') {
      this.server.emit('transaccion', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      if (
        data.cant &&
        data.addressDest &&
        data.addresOrigin &&
        data.caducidad
      ) {
        const trx = new Trx(
          data.cant,
          new Address(data.addressDest),
          new Address(data.addresOrigin),
          data.caducidad,
        );
        console.log(trx);

        if (trx.isTimeValid()) {
          this.ormTransaccionService.insertTransacction(trx);
          this.server.emit('transaccion', { event, data });
        } else {
          client.emit('nueva_transaccion', {
            error: `error received  ${data}, expected {cant:number, addressDest:string, addresOrigin:string, caducidad:number}`,
          });
        }
      } else {
        client.emit('transaccion', {
          error: `La transaccion ha caducado`,
        });
      }
      return { event, data };
    }
  }
  @SubscribeMessage('getTransactionById')
  getTransactionById(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const event = 'get-transaction';
    if (typeof data !== 'object') {
      client.emit('transaccion-by-id', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      /*   const trx = new Trx(
        data.cant,
        new Address(data.addressDest),
        new Address(data.addresOrigin),
        data.caducidad,
      ); */
      if (data.id) {
        this.ormTransaccionService.getById(data?.id).then((value) => {
          client.emit('transaccion-by-id', { event, value });
        });
      } else {
        client.emit('transaccion-by-id', {
          error: `error received  ${typeof data}, expected {id:value}`,
        });
      }
    }
    return false;
  }
  @SubscribeMessage('getTransacciones')
  getTransacciones(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const event = 'getTransacciones';
    this.ormTransaccionService.getAll().then((value) => {
      const items = value?.reduce((previous, next: any) => {
        const trx = new Trx(
          next.cantidad,
          new Address(next.addressDestino),
          new Address(next.addressOrigen),
          next.caducidad,
        );
        trx.setTrx(next.id, next.timestamp);
        return [...previous, trx.toStringDeep()];
      }, []);

      client.emit('transacciones', { event, items, value });
    });

    return false;
  }
  @SubscribeMessage('getTransaccionesByOrigin')
  getTransaccionesByAddressOrigin(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const event = 'getTransaccionesByOrigin';
    if (typeof data !== 'object') {
      client.emit('transaccion-by-id', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      if (data.addressOrigin) {
        this.ormTransaccionService
          .getByAddressOrigin(data.addressOrigin)
          .then((value: any) => {
            const items = value?.reduce((previous, next: any) => {
              const trx = new Trx(
                next.cantidad,
                new Address(next.addressDestino),
                new Address(next.addressOrigen),
                next.caducidad,
              );
              trx.setTrx(next.id, next.timestamp);
              return [...previous, trx.toStringDeep()];
            }, []);

            client.emit('transacciones', { event, items, value });
          })
          .catch((error) => {
            client.emit('transacciones', {
              error: error,
            });
          });
      } else {
        client.emit('transacciones', {
          error: `error received  ${typeof data}, expected {addressOrigin:value}`,
        });
      }
    }
    return false;
  }
  @SubscribeMessage('getTransaccionesByDestino')
  getTransaccionesByDestino(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const event = 'getTransaccionesByDestino';
    if (typeof data !== 'object') {
      client.emit('transaccion-by-id', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      if (data.addressDestino) {
        this.ormTransaccionService
          .getByAddressDestino(data.addressDestino)
          .then((value: any) => {
            const items = value?.reduce((previous, next: any) => {
              const trx = new Trx(
                next.cantidad,
                new Address(next.addressDestino),
                new Address(next.addressOrigen),
                next.caducidad,
              );
              trx.setTrx(next.id, next.timestamp);
              return [...previous, trx.toStringDeep()];
            }, []);

            client.emit('transacciones', { event, items, value });
          })
          .catch((error) => {
            client.emit('transacciones', {
              error: error,
            });
          });
      } else {
        client.emit('transacciones', {
          error: `error received  ${typeof data}, expected {addressDestino:value}`,
        });
      }
    }
    return false;
  }
}
