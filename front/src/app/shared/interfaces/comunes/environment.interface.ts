export interface IEnvironment {
  production: boolean;
  UrlSocket: string;
  portSocket: string;
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
        transacciones: string;
      };
      nodo: {
        get_nodo: string;
        nuevoNodo: string;
      };
      verificarDatabase: {
        verificarMiDatabase: string;
      };
      sincronizarCadena: {
        sincronizar: string;
      };
    };
  };
}
