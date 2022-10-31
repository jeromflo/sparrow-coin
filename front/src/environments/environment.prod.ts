import { IEnvironment } from 'src/app/shared/interfaces/comunes/environment.interface';

export const environment: IEnvironment = {
  production: true,
  UrlSocket: 'localhost',
  portSocket: '15600',
  events: {
    emits: {
      transacciones: {
        getTransacciones: 'getTransacciones',
        getTransaccionID: 'getTransactionById',
        getTransaccionOrigin: 'getTransaccionesByOrigin',
        getTransaccionDestino: 'getTransaccionesByDestino',
        crearTransaccion: 'create_transaccion',
      },
      nodo: {
        getNodos: 'get_nodos',
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
        transacciones: 'transacciones',
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
