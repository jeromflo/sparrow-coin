export interface INodo {
  id: string;
  id_union_transaccion: string;
  minero: string;
  timestamp: number;
}

export interface IFullNodoData {
  id_nodo: string;
  minero: string;
  caducidad: number;
  id_union_transaccion_node: string;
  timestamp_node: number;
  transaction_id: string;
  transaction_cantidad: number;
  transaction_timestamp: number;
  addressDestino: string;
  addressOrigen: string;
}
