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
        getTransaccionID: string;
        getTransaccionOrigin: string;
        getTransaccionDestino: string;
        crearTransaccion: string;
      };
      nodo: {
        getNodos: string;
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
        transacciones: string | Subject<any>;
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
