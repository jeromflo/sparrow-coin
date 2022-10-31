// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from 'src/app/shared/interfaces/comunes/environment.interface';

export const environment: IEnvironment = {
  UrlSocket: 'localhost',
  portSocket: '15600',
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error',  // Included with Angular CLI.
