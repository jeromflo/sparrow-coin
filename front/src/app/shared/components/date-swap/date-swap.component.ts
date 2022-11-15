import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-swap',
  templateUrl: './date-swap.component.html',
  styleUrls: ['./date-swap.component.scss'],
})
export class DateSwapComponent implements OnInit {
  @Input() elemento: any;
  desactiveDatePipeCaducidad = false;
  constructor() {}

  ngOnInit(): void {}
}
