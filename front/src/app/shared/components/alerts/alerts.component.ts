import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IAlertRedux } from '../../interfaces/comunes/alert.interface';
import { close } from '../../redux/actions/comun/alerts.actions';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: IAlertRedux[] = [];
  private subscribe: Subscription = new Subscription();
  constructor(private store: Store<{ alert: IAlertRedux[] }>) {
    this.subscribe.add(
      this.store.select('alert').subscribe((data) => {
        this.alerts = data;
        if (data.length > 0) {
          this.openAlert();
        }
      })
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {}
  private openAlert() {
    const alert = this.alerts[0];
    let timerInterval: NodeJS.Timer;
    Swal.fire({
      title: alert.title,
      html: alert.menssage,
      timer: alert.timer,
      icon: alert.icon,
      showConfirmButton: false,

      timerProgressBar: true,
      didOpen: () => {
        // Swal.showLoading();
        const b: any = Swal.getHtmlContainer()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (!!b) {
            b.textContent = Swal.getTimerLeft();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        this.store.dispatch(close());
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }
}
