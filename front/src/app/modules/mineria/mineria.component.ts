import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { fadeAnimation2 } from 'src/app/shared/animations/fadeAnimation.animations';
import { IAlertRedux } from 'src/app/shared/interfaces/comunes/alert.interface';
import { ICreateNodo } from 'src/app/shared/interfaces/nodos/create_nodo.interface';
import { ITransaccion } from 'src/app/shared/interfaces/transaccion.interfaces';
import { setAlert } from 'src/app/shared/redux/actions/comun/alerts.actions';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mineria',
  templateUrl: './mineria.component.html',
  styleUrls: ['./mineria.component.scss'],
  animations: [fadeAnimation2],
})
export class MineriaComponent implements OnInit {
  mineriaAutomatica = false;
  mostrarNodosMinados = true;
  public minerHash = '';
  private transacciones: ITransaccion[] = [];
  private lastIdMark = 0;
  private subscribe: Subscription = new Subscription();
  constructor(
    private socketService: SocketClientService,
    private store: Store<{ login: string[] }>
  ) {
    const pathNuevoNodo = ['nodo', 'nuevoNodo'];
    this.socketService.getOn(pathNuevoNodo);
    this.subscribe.add(
      this.socketService
        .getObservable(pathNuevoNodo)
        .pipe(
          filter((el) => {
            return this.transacciones.length > 0;
          }),
          filter((el) => {
            return el?.code == 1;
          })
        )
        .subscribe((data) => {
          this.minarItems(this.transacciones);
        })
    );
    /*   this.socketService
      .getObservable(pathNuevoNodo)
      .pipe(
        filter((el) => {
          return !!el.error;
        })
      )
      .subscribe(console.log); */
    this.subscribe.add(
      this.socketService
        .getObservable(pathNuevoNodo)
        .pipe(
          filter((el) => el.idMark !== this.lastIdMark),
          filter((el) => {
            return !el.error;
          })
        )
        .subscribe((data) => {
          this.lastIdMark = data.idMark;
          this.store.dispatch(
            setAlert({
              value: {
                menssage: 'Transaccion Realizada',
                icon: 'success',
                title: 'create_nodo',
                timer: 2000,
              },
            })
          );
          setTimeout(() => {
            this.socketService.emitSocket(
              environment.events.emits.transacciones.getWithoutMining
            );
          }, 2000);
        })
    );
    this.subscribe.add(
      this.store.select('login').subscribe((data) => {
        this.minerHash = JSON.stringify(data).hashCode();
      })
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getWithoutMining
    );
  }
  minarItems(elementos: ITransaccion[]) {
    this.transacciones = elementos;
    const trxs: ICreateNodo['transactions'] = elementos?.map((item) => ({
      id: item.id,
    }));
    const createNodoBody: ICreateNodo = {
      miner: this.minerHash,
      transactions: trxs,
    };
    this.socketService.emitSocket(
      environment.events.emits.nodo.createNodo,
      createNodoBody
    );
  }
}
