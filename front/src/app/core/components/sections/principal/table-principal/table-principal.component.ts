import { Component, OnInit, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { INodo } from 'src/app/shared/interfaces/nodos';
@Component({
  selector: 'app-table-principal',
  templateUrl: './table-principal.component.html',
  styleUrls: ['./table-principal.component.scss'],
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
export class TablePrincipalComponent {
  @Input() data: INodo[] | undefined;
  drop = false;
  constructor() {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
