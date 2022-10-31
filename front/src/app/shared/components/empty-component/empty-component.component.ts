import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-empty-component',
  templateUrl: './empty-component.component.html',
  styleUrls: ['./empty-component.component.scss'],
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
export class EmptyComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
