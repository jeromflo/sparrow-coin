import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOut]',
})
export class ClickOutDirective {
  @HostListener('document:click', ['$event']) clicked(data: Event) {
    /*     console.log(data);
     */
    let target: Element = data.target as Element;
    if (!target.closest('nav')) {
      this.appClickOut.emit(false);
    }
  }
  @Output() appClickOut = new EventEmitter();
  constructor() {}
}
