import { IEnvironment } from 'src/app/shared/interfaces/comunes/environment.interface';

export const environment: IEnvironment = {
  keysLogin: [],
  production: true,
  UrlSocket: 'localhost',
  portSocket: 15600,
  events: {
    emits: {
      transacciones: {
        getTransacciones: 'getTransacciones',
        getWithoutMining: 'getWithoutMining',
        getTransaccionID: 'getTransactionById',
        getTransaccionOrigin: 'getTransaccionesByOrigin',
        getTransaccionDestino: 'getTransaccionesByDestino',
        getTransaccionOriginMined: 'getTransaccionesByOriginMined',
        getTransaccionDestinoMined: 'getTransaccionesByDestinoMined',
        crearTransaccion: 'create_transaccion',
      },
      nodo: {
        getNodos: 'get_nodos',
        get_nodo_by_Miner: 'get_nodo_by_Miner',

        getNodosAllData: 'get_nodos_merge',
        getNodoId: 'get_nodo_by_id',
        createNodo: 'create-nodo',
      },
      verificarDatabase: {
        verificarMiDatabase: 'verify-database',
      },
      sincronizarCadena: {
        sincronizarCadena: 'sync-chain',
      },
    },
    listen: {
      transacciones: {
        transaccion: 'transaccion',
        transaccionesByOrigin: 'transaccionesByOrigin',
        transaccionesByDestino: 'transaccionesByDestino',
        transacciones: 'transacciones',
        transaccionesByOriginMined: 'transaccionesByOriginMined',
        transaccionesByDestinoMined: 'transaccionesByDestinoMined',
        nueva_transaccion: 'nueva_transaccion',
      },
      nodo: {
        get_nodo: 'get_nodo',
        nuevoNodo: 'nuevo_nodo',
      },
      verificarDatabase: {
        verificarMiDatabase: 'verify_my_database',
      },
      sincronizarCadena: {
        sincronizar: 'sync',
      },
    },
  },
};
