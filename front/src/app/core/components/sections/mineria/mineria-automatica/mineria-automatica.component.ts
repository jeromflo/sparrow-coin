import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, filter, interval, Subscription } from 'rxjs';
import { ITransaccion } from 'src/app/shared/interfaces/transaccion.interfaces';
import { setAlert } from 'src/app/shared/redux/actions/comun/alerts.actions';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mineria-automatica',
  templateUrl: './mineria-automatica.component.html',
  styleUrls: ['./mineria-automatica.component.scss'],
})
export class MineriaAutomaticaComponent implements OnInit {
  @Input() functionMineria: Function = () => {};
  @Input() minerHash: string = '';
  @Input() isMining = false;
  transacciones: ITransaccion[] = [];
  //private readonly MINUTOS = 600000;
  private readonly MINUTOS = 3000;
  private readonly DECREMENT_TIMER = this.MINUTOS / 3;

  private readonly INITIAL_TIMER = this.MINUTOS * 3;
  private timer = this.INITIAL_TIMER;
  private subscribe: Subscription = new Subscription();
  get contador() {
    return this.timer;
  }
  constructor(
    private socketService: SocketClientService,
    private store: Store
  ) {
    setInterval(this.autoMineria, this.timer);
    this.subscriptionTransaccionesOK();
    this.subscriptionNuevoNodoOK();
    this.subscriptionNuevoNodoNoOk();
    this.getDispathWitouthMining();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {}
  autoMineria = () => {
    let items: ITransaccion[] = [];
    if (this.transacciones?.length > 0) {
      this.isMining = true;
      items = this.getXItems(5);
    } else {
      this.isMining = true;
      this.store.dispatch(
        setAlert({
          value: {
            menssage:
              'No hay transacciones para minar, creando transacciones sin trx',
            icon: 'info',
            title: 'create_nodo',
            timer: 2000,
          },
        })
      );
    }
    this.functionMineria(items);
    this.isMining = false;
    if (this.timer < 1000) {
      this.timer = this.INITIAL_TIMER;
    }
    this.timer = this.timer - this.DECREMENT_TIMER;
  };
  getDispathWitouthMining() {
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getWithoutMining
    );
  }
  getXItems(x: number) {
    if (this.transacciones.length > x) {
      return this.transacciones.slice(0, x);
    }
    return this.transacciones;
  }

  subscriptionTransaccionesOK() {
    const pathTransacciones = ['transacciones', 'transacciones'];

    this.socketService.getOn(pathTransacciones);

    this.subscribe.add(
      this.socketService
        .getObservable(pathTransacciones)
        .pipe(filter(() => !this.isMining))
        .subscribe((el) => {
          this.transacciones = el?.value;
          /*         this.autoMineria();
           */
        })
    );
  }
  subscriptionNuevoNodoOK() {
    const pathNuevoNodo = ['nodo', 'nuevoNodo'];
    this.socketService.getOn(pathNuevoNodo);
    this.subscribe.add(
      this.socketService
        .getObservable(pathNuevoNodo)
        .pipe(
          filter(() => !this.isMining),
          filter((el) => {
            return !el.error;
          })
        )
        .subscribe((data) => {
          this.timer = this.INITIAL_TIMER;
          /*         setTimeout(this.autoMineria, this.timer);
           */
        })
    );
  }
  subscriptionNuevoNodoNoOk() {
    const pathNuevoNodo = ['nodo', 'nuevoNodo'];
    this.socketService.getOn(pathNuevoNodo);
    this.subscribe.add(
      this.socketService
        .getObservable(pathNuevoNodo)
        .pipe(
          filter(() => !this.isMining),
          filter((el) => {
            return this.transacciones.length > 0;
          }),
          filter((el) => {
            return el?.code == 1;
          })
        )
        .subscribe((data) => {
          /*         setTimeout(this.autoMineria, this.timer);
           */
        })
    );
  }
}
