export interface ITransaccion {
  id: string;
  cantidad: number;
  addressDestino: string;
  addressOrigen: string;
  caducidad: number;
  timestamp: number;
}
