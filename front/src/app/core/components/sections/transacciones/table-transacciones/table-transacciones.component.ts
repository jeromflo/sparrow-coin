import { Component, OnInit, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ITransaccion } from 'src/app/shared/interfaces/transaccion.interfaces';
@Component({
  selector: 'app-table-transacciones',
  templateUrl: './table-transacciones.component.html',
  styleUrls: ['./table-transacciones.component.scss'],
  animations: [
    trigger('showTrigger', [
      state(
        'animate',
        style({
          opacity: '1',
        })
      ),
      transition('void => *', [
        style({ opacity: '0.4' }),
        animate('300ms 0s ease-in-out'),
      ]),
    ]),
  ],
})
export class TableTransaccionesComponent implements OnInit {
  @Input() data: ITransaccion[] | undefined;
  drop = true;
  desactiveDatePipeCaducidad = false;
  desactiveDatePipeTimeStamp = false;
  constructor() {}

  ngOnInit(): void {}
}
