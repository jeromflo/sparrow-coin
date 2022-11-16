import { Subject } from 'rxjs';

export interface IEnvironment {
  keysLogin: string[];
  production: boolean;
  UrlSocket: string;
  portSocket: number;
  events: {
    emits: {
      transacciones: {
        getTransacciones: string;
        getWithoutMining: string;
        getTransaccionID: string;
        getTransaccionOrigin: string;
        getTransaccionDestino: string;
        getTransaccionOriginMined: string;
        getTransaccionDestinoMined: string;
        crearTransaccion: string;
      };
      nodo: {
        getNodos: string;
        get_nodo_by_Miner: string;
        getNodosAllData: string;
        getNodoId: string;
        createNodo: string;
      };
      verificarDatabase: {
        verificarMiDatabase: string;
      };
      sincronizarCadena: {
        sincronizarCadena: string;
      };
    };
    listen: {
      transacciones: {
        transaccion: string | Subject<any>;
        transacciones: string | Subject<any>;
        transaccionesByOrigin: string | Subject<any>;
        transaccionesByDestino: string | Subject<any>;
        transaccionesByOriginMined: string | Subject<any>;
        transaccionesByDestinoMined: string | Subject<any>;
        nueva_transaccion: string | Subject<any>;
      };
      nodo: {
        get_nodo: string | Subject<any>;
        nuevoNodo: string | Subject<any>;
      };
      verificarDatabase: {
        verificarMiDatabase: string | Subject<any>;
      };
      sincronizarCadena: {
        sincronizar: string | Subject<any>;
      };
    };
  };
}
