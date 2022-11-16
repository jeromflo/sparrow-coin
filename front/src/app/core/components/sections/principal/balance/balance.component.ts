import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { IFullNodoData } from 'src/app/shared/interfaces/nodos';
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
  byMining = 0;
  private isDestinoEnd = false;
  private isOrigenEnd = false;
  private hashID = '';
  private subscribe: Subscription = new Subscription();
  constructor(
    private socketService: SocketClientService,
    private store: Store<{ login: string[] }>
  ) {
    this.subscribe.add(
      this.store.select('login').subscribe((data) => {
        this.hashID = data.hashCode();
        this.socketDestino();
        this.socketOrigen();
      })
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {}
  calculateBalance() {
    this.balance = this.byMining + this.destino - this.origen;
  }
  socketDestino() {
    const pathDestino = ['transacciones', 'transaccionesByDestinoMined'];
    this.socketService.getOn(pathDestino);
    this.subscribe.add(
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
        )
    );
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getTransaccionDestinoMined,
      { addressDestino: this.hashID }
    );
  }
  socketOrigen() {
    const pathOrigen = ['transacciones', 'transaccionesByOriginMined'];
    this.socketService.getOn(pathOrigen);
    this.subscribe.add(
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
        )
    );
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getTransaccionOriginMined,
      { addressOrigin: this.hashID }
    );
  }
  subscriptionNuevoNodo(): void {
    const pathNuevoNodo = ['nodo', 'get_nodo'];
    this.socketService.getOn(pathNuevoNodo);
    this.socketService
      .getObservable(pathNuevoNodo)
      .pipe(map((data) => data?.value))
      .subscribe((data: IFullNodoData[]) => {
        data.forEach((elNodo: any) => {
          this.byMining += elNodo.recompensa;
        });
      });
  }
}
