import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITransaccion } from 'src/app/shared/interfaces/transaccion.interfaces';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  balance = 0;
  destino = 0;
  origen = 0;
  private isDestinoEnd = false;
  private isOrigenEnd = false;
  private hashID = '';
  constructor(
    private socketService: SocketClientService,
    private store: Store<{ login: string[] }>
  ) {
    this.store.select('login').subscribe((data) => {
      this.hashID = data.toString().hashCode();
      this.socketDestino();
      this.socketOrigen();
    });
  }

  ngOnInit(): void {}
  calculateBalance() {
    this.balance = this.destino - this.origen;
  }
  socketDestino() {
    const pathDestino = ['transacciones', 'transaccionesByDestino'];
    this.socketService.getOn(pathDestino);
    this.socketService
      .getObservable(pathDestino)
      .subscribe(
        (data: { event: string; items: string; value: ITransaccion[] }) => {
          data?.value.forEach((acc) => {
            this.destino += acc.cantidad;
          }, 0);
          this.isDestinoEnd = true;
          this.calculateBalance();
        }
      );
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getTransaccionDestino,
      { addressDestino: this.hashID }
    );
  }
  socketOrigen() {
    const pathOrigen = ['transacciones', 'transaccionesByOrigin'];
    this.socketService.getOn(pathOrigen);
    this.socketService
      .getObservable(pathOrigen)
      .subscribe(
        (data: { event: string; items: string; value: ITransaccion[] }) => {
          data?.value.forEach((acc) => {
            this.origen += acc.cantidad;
          }, 0);
          this.isDestinoEnd = true;
          this.calculateBalance();
        }
      );
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getTransaccionOrigin,
      { addressOrigin: this.hashID }
    );
  }
}
