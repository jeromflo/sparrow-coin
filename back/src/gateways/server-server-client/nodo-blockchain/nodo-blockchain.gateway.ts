import { UnionTransaccionService } from './../../../shared/orm/union-transaccion/union-transaccion.service';
import { UnionTransaccion } from './../../../model/union-transaccion';
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
import { Miner } from 'src/model/miner';
export type transacction = {
  id: string;
};
@WebSocketGateway(15600, { cors: true })
export class NodoBlockchainGateway {
  @WebSocketServer()
  server: Socket;
  timeNewNode = 1000 * 60 * 10; //1000 millis 60 seconds 10 minutes total 10 minutos en millis
  constructor(
    private ormTransaccionService: TransaccionORMService,
    private ormUnionTransaccionService: UnionTransaccionService,
    private ormNodeService: NodeOrmService,
  ) {}

  @SubscribeMessage('create-nodo')
  async handleEvent(
    @MessageBody() data: { miner: string; transactions: transacction[] },
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const event = 'create-nodo';
    console.log(this.ormTransaccionService);

    if (typeof data !== 'object') {
      this.server.emit('nuevo_nodo', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      if (data.miner && data.transactions) {
        const valueLastNodo: any[] | undefined =
          await this.ormNodeService.getLastNode();
        let validTime = false;
        if (valueLastNodo?.length > 0) {
          validTime =
            valueLastNodo[0].timestamp + this.timeNewNode <
            new Date().getTime();
        }
        if (validTime) {
          //comporobacion de que cada 10 minutos se haga un nuevo nodo
          const merkleTree = new MerkleTreeImpl();
          const isValidTrxs = await this.isValidTrxsNotMinning(
            data.transactions.reduce(
              (previous, next) => [...previous, next.id],
              [],
            ),
          );
          if (isValidTrxs) {
            const trx = await data.transactions.reduce(this.callbackReduce, []);
            merkleTree.createMerkleTree(
              trx.reduce((previous, next) => [...previous, next.id], []),
              //al hacerlo asi, conseguimos que solo se añadan al nodo, las transacciones correctas
            );

            const nodo: Nodo = new Nodo(new Miner(data.miner), trx, merkleTree);
            const unionTransaccion = new UnionTransaccion(trx, nodo);
            this.ormUnionTransaccionService
              .insertUnionTransaccion(
                // eslint-disable-next-line prettier/prettier
                unionTransaccion,
              )
              .then((res) => {
                this.ormNodeService
                  .insertNodo(nodo, unionTransaccion.getId())
                  .then((res) => {
                    this.server.emit('nuevo_nodo', {
                      event,
                      nodo: nodo.toStringDeep(),
                    });
                  })
                  .catch((err: Error) => {
                    client.emit('nuevo_nodo', {
                      error: `error received  ${err.toString()}`,
                    });
                  });
              })
              .catch((err: Error) => {
                client.emit('nuevo_nodo', {
                  error: `error received  ${err.toString()}`,
                });
              });
          } else {
            client.emit('nuevo_nodo', {
              error: `Transacciones ya minadas, cambia las transacciones`,
            });
          }
        } else {
          client.emit('nuevo_nodo', {
            error: `error received no se ha superado el tiempo de 10 minutos por bloque`,
          });
        }
      } else {
        this.errorJson(
          'nuevo_nodo',
          client,
          data,
          `{ miner: string; transactions: {
          id: string;
        }[]`,
        );
      }
    }
    return { event, data };
  }

  @SubscribeMessage('get_nodo_by_id')
  getNodoById(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const event = 'get_nodo_by_id';
    if (typeof data !== 'object') {
      client.emit('get_nodo', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      if (data.id) {
        this.ormNodeService.getById(data?.id).then((value) => {
          client.emit('get_nodo', { event, value });
        });
      } else {
        this.errorJson('get_nodo', client, data, '{ id:string}');
      }
    }
    return false;
  }
  @SubscribeMessage('get_nodos')
  getNodos(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const event = 'get_nodos';
    if (typeof data !== 'object') {
      client.emit('get_nodo', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      this.ormNodeService.getAll().then((value) => {
        client.emit('get_nodo', { event, value });
      });
    }
    return false;
  }
  @SubscribeMessage('get_nodos_merge')
  getNodosMerge(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const event = 'get_nodos_merge';
    if (typeof data !== 'object') {
      client.emit('get_nodo', {
        error: `error the type of data is ${typeof data}, please send json`,
      });
    } else {
      this.ormNodeService.getAllMergeData().then((value: any[]) => {
        const minero = value.length > 0 ? value[0].minero : '';

        const trx: Trx[] = value.reduce((previous, next) => {
          const temp = new Trx(
            next?.transaction_cantidad,
            new Address(next?.addressDestino),
            new Address(next?.addressOrigen),
            next?.caducidad,
          );
          temp.setTrx(next?.transaction_id, next?.transaction_timestamp);

          return [...previous, temp];
        }, []);
        const merkleTree = new MerkleTreeImpl();
        merkleTree.createMerkleTree(
          trx.reduce((previous, next) => [...previous, next.getId()], []),
        );
        if (minero !== '') {
          const nodo: Nodo = new Nodo(new Miner(minero), trx, merkleTree);
          const unionTransaccion = new UnionTransaccion(trx, nodo);
          client.emit('get_nodo', {
            event,
            value,
            nodo: nodo.toString(),
            unionTransaccion: unionTransaccion.toString(),
          });
        } else
          client.emit('get_nodo', { error: 'ViewNodeTransactions esta vacio' });
      });
    }
    return false;
  }

  callbackReduce = async (previous, next) => {
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
  };
  errorJson(event, client, data, expected) {
    client.emit(event, {
      error: `error received  ${JSON.stringify(data)}, expected ${expected}`,
    });
  }
  /**
   *compruebo que las transacciones no hayan sido minadas, y que existan en la tabla de transacciones
   * @param trxComprobar array con ids a comprobar
   * @returns true si es valido y se pueden minar, false en caso contrario
   */
  async isValidTrxsNotMinning(trxComprobar: string[]) {
    const data = await this.ormTransaccionService.getByArraysIdNotMinning(
      trxComprobar,
    );
    console.log(data);

    if (data?.length < trxComprobar.length) {
      return false;
    } else {
      return true;
    }
  }
}
