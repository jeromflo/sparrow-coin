// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from 'src/app/shared/interfaces/comunes/environment.interface';

export const environment: IEnvironment = {
  keysLogin: [
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'aux',
    'Fin',
  ],
  UrlSocket: 'localhost',
  portSocket: 15600,
  production: false,
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
        crearTransaccion: 'create-transaccion',
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
        transaccionesByOriginMined: 'transaccionesByOriginMined',
        transaccionesByDestinoMined: 'transaccionesByDestinoMined',
        transacciones: 'transacciones',
        nueva_transaccion: 'nueva_transaccion',
      },
      nodo: {
        get_nodo: 'get_nodo',
        get_nodo_By_Miner: 'get_nodo_By_Miner',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error',  // Included with Angular CLI.
