import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
})
export class TransaccionesComponent implements OnInit {
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
  }

  ngOnInit(): void {}
}
