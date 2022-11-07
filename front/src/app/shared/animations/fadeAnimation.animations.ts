import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms', style({ opacity: 0 })),
  ]),
]);

export const fadeAnimation2 = trigger('fadeAnimation', [
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
]);
