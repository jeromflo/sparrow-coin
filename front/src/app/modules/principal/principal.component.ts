import { Component, OnInit } from '@angular/core';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  public data$: Observable<any> | undefined;

  constructor(private socketService: SocketClientService) {
    this.socketService.getOn(['transacciones', 'transacciones']);
    this.socketService.emitSocket(
      environment.events.emits.transacciones.getTransacciones
    );
    this.data$ = this.socketService.getObservable([
      'transacciones',
      'transacciones',
    ]);
    /* .then((data: any) => {
      console.log(data);


    }); */
  }

  ngOnInit(): void {}
  clicked() {
    this.socketService.imprimir(0);
    /*     console.log('prueba', this.subjectsSocket);
     */
  }
}
