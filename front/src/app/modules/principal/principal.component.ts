import { Component, OnInit } from '@angular/core';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  public data$: Observable<any> | undefined;

  constructor(private socketService: SocketClientService) {
    this.socketService.getOn(['nodo', 'get_nodo']);
    this.socketService.emitSocket(environment.events.emits.nodo.getNodos);
    this.data$ = this.socketService.getObservable(['nodo', 'get_nodo']);
  }

  ngOnInit(): void {}
}
