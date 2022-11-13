import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { environment } from 'src/environments/environment';
import { IEnvironment } from '../../interfaces/comunes/environment.interface';
import { SocketClientConnectionService } from '../socketClientConnection/socket-client-connection.service';

@Injectable({
  providedIn: AppModule,
})
export class SocketClientService {
  private subjects: IEnvironment['events']['listen'] = {
    transacciones: {
      transaccion: new Subject(),
      transacciones: new Subject(),
      nueva_transaccion: new Subject(),
    },
    nodo: {
      get_nodo: new Subject(),
      nuevoNodo: new Subject(),
    },
    verificarDatabase: {
      verificarMiDatabase: new Subject(),
    },
    sincronizarCadena: {
      sincronizar: new Subject(),
    },
  };
  constructor(private socketService: SocketClientConnectionService) {}
  getOn(path: string[]) {
    let subject: any = this.subjects;
    path.forEach((el) => {
      subject = subject[el];
    });
    let nameEvent: any = environment.events.listen;
    path.forEach((el) => {
      nameEvent = nameEvent[el];
    });
    this.socketService.getSocket().on(nameEvent, (data: any) => {
      subject.next(data);
    });
  }
  getObservable(path: string[]) {
    let subject: any = this.subjects;
    path.forEach((el) => {
      subject = subject[el];
    });

    return (<Subject<any>>subject).asObservable();
  }
  public unsubscribeListenSocket(nameEvent: string): void {
    /*     this.socketService.getSocket().removeAllListeners(nameEvent);
     */
  }
  public emitSocket(nameEvent: string, params?: any) {
    this.socketService.getSocket().emit(nameEvent, params);
  }
  imprimir(nameEvent: any) {
    console.log(this.subjects);
  }
}
