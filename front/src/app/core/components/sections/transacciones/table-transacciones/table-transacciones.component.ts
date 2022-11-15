import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ITransaccion } from 'src/app/shared/interfaces/transaccion.interfaces';
import { fadeAnimation2 } from 'src/app/shared/animations/fadeAnimation.animations';
@Component({
  selector: 'app-table-transacciones',
  templateUrl: './table-transacciones.component.html',
  styleUrls: ['./table-transacciones.component.scss'],
  animations: [fadeAnimation2],
})
export class TableTransaccionesComponent implements OnInit {
  @Input() data: ITransaccion[] | undefined;
  @Input() seleccionar: boolean = false;
  @Output() seleccionados: EventEmitter<ITransaccion[]> = new EventEmitter<
    ITransaccion[]
  >();
  drop = false;
  desactiveDatePipeCaducidad = false;
  desactiveDatePipeTimeStamp = false;
  itemsSeleccionados: { [key: string]: any } = {};
  constructor() {}

  ngOnInit(): void {}
  checked(product: ITransaccion) {
    let hash = JSON.stringify(product).hashCode();
    if (this.itemsSeleccionados[hash]) {
      delete this.itemsSeleccionados[hash];
    } else {
      this.itemsSeleccionados[hash] = product;
    }
  }
  enviarTransaccionesSeleccionadas() {
    if (Object.keys(this.itemsSeleccionados).length > 0) {
      this.seleccionados.emit([...Object.values(this.itemsSeleccionados)]);
    }
  }
}
