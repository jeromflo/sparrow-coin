import { NodeOrmService } from './../../../shared/orm/node/node.orm.service';
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
import { Nodo } from 'src/model/node';
import { MerkleTreeImpl } from 'src/model/merkleTree';
export type transacction = {
  id: number;
};
@WebSocketGateway(15600)
export class NodoBlockchainGateway {
  @WebSocketServer()
  server: Socket;
  constructor(
    private ormTransaccionService: TransaccionORMService,
    private ormNodeService: NodeOrmService,
  ) {}

  @SubscribeMessage('create-nodo')
  async handleEvent(
    @MessageBody() data: { miner: string; transactions: transacction[] },
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const event = 'create-nodo';
    console.log(data);
    if (typeof data !== 'object') {
      this.server.emit('nodo', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      const merkleTree = new MerkleTreeImpl();
      const trx = await data.transactions.reduce(this.callbackReduce, []);
      /*       const transacciones: Trx = 
        .then((value) => {
          client.emit('transaccion-by-id', { event, value });
        }); */
      merkleTree.createMerkleTree(
        data.transactions.reduce(
          (previous, next) => [...previous, next.id],
          [],
        ),
      );
      const nodo: Nodo = new Nodo(data.miner, trx, merkleTree);
      console.log(nodo);

      this.ormTransaccionService.insertTransacction(trx);
      this.server.emit('transaccion', { event, data });
    }
    return { event, data };
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
  async callbackReduce(previous, next) {
    const data = await this.ormTransaccionService.getById(next?.id);
    if (data.length > 0) {
      const trx = new Trx(
        data[0].cantidad,
        new Address(data[0].addressDestino),
        new Address(data[0].addressOrigen),
        data[0].caducidad,
      );
      trx.setTrx(data[0].id, data[0].timestamp);
      return [...(await previous), trx];
    }
    return [...(await previous)];
  }
}
