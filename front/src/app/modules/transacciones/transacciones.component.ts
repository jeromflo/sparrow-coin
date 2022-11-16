import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { ITransaccion } from 'src/app/shared/interfaces/transaccion.interfaces';
@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
})
export class TransaccionesComponent implements OnInit {
  @Input() seleccionar = false;
  @Input() inicializar = true;
  @Output() seleccionados: EventEmitter<ITransaccion[]> = new EventEmitter<
    ITransaccion[]
  >();
  public data$: Observable<any> | undefined;
  private subscribe: Subscription = new Subscription();
  constructor(private socketService: SocketClientService) {
    const pathNuevaTransaccion = ['transacciones', 'transaccion'];
    const pathTransacciones = ['transacciones', 'transacciones'];

    this.socketService.getOn(pathNuevaTransaccion);
    this.socketService.getOn(pathTransacciones);
    this.subscribe.add(
      this.socketService
        .getObservable(pathNuevaTransaccion)
        .subscribe((data) => {
          this.socketService.emitSocket(
            environment.events.emits.transacciones.getTransacciones
          );
        })
    );
    this.data$ = this.socketService.getObservable(pathTransacciones);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  handlerElementosSeleccionados(elementos: ITransaccion[]) {
    this.seleccionados.emit(elementos);
  }
  ngOnInit(): void {
    if (this.inicializar) {
      this.socketService.emitSocket(
        environment.events.emits.transacciones.getTransacciones
      );
    }
  }
}
