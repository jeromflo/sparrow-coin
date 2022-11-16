import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { fadeAnimation } from 'src/app/shared/animations/fadeAnimation.animations';
import { IFullNodoData } from 'src/app/shared/interfaces/nodos';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-mineria-automatica',
  templateUrl: './table-mineria-automatica.component.html',
  styleUrls: ['./table-mineria-automatica.component.scss'],
  animations: [fadeAnimation],
})
export class TableMineriaAutomaticaComponent implements OnInit {
  @Input() minerHash: string = '';
  data$;
  constructor(private socketService: SocketClientService) {
    this.data$ = this.subscriptionNuevoNodo();
  }

  ngOnInit(): void {
    this.socketService.emitSocket(
      environment.events.emits.nodo.get_nodo_by_Miner,
      { id: this.minerHash }
    );
  }
  subscriptionNuevoNodo(): Observable<IFullNodoData[]> {
    const pathNuevoNodo = ['nodo', 'get_nodo'];
    this.socketService.getOn(pathNuevoNodo);
    return this.socketService
      .getObservable(pathNuevoNodo)
      .pipe(map((data) => data?.value));
  }
}
