import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { fadeAnimation2 } from 'src/app/shared/animations/fadeAnimation.animations';
import { setAlert } from 'src/app/shared/redux/actions/comun/alerts.actions';
import { SocketClientService } from 'src/app/shared/services/socketClient/socket-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-transaccion',
  templateUrl: './crear-transaccion.component.html',
  styleUrls: ['./crear-transaccion.component.scss'],
  animations: [fadeAnimation2],
})
export class CrearTransaccionComponent implements OnInit {
  public forms: FormGroup<{
    cant: FormControl<string | null>;
    addresDest: FormControl<string | null>;

    caducidad: FormControl<string | null>;
  }>;
  private myAddress: string = '00000';
  private subscribe: Subscription = new Subscription();
  get cant() {
    return this.forms.get('cant') as FormControl<string | null>;
  }
  get addressDest() {
    return this.forms.get('addresDest') as FormControl<string | null>;
  }
  get cad() {
    return this.forms.get('caducidad') as FormControl<string | null>;
  }
  constructor(
    private fb: FormBuilder,
    private store: Store<{ login: string[] }>,
    private socketService: SocketClientService
  ) {
    this.subscribe.add(
      this.store.select('login').subscribe((data) => {
        this.myAddress = data.hashCode();
      })
    );
    this.forms = this.fb.group({
      cant: ['', [Validators.min(0)]],
      addresDest: [''],
      caducidad: [''],
      /* cant: ['1', [Validators.min(0)]],
      addresDest: ['2311'],
      caducidad: ['2022-11-12'], */
    });
    const pathNuevaTransaccion = ['transacciones', 'transacciones'];
    this.socketService.getOn(pathNuevaTransaccion);
    this.subscribe.add(
      this.socketService
        .getObservable(pathNuevaTransaccion)
        .subscribe((data: any) => {
          this.store.dispatch(
            setAlert({
              value: {
                menssage: 'Transaccion creada',
                title: 'Transaccion',
                icon: 'success',
                timer: 2000,
              },
            })
          );
        })
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {}
  submitData(el: Event) {
    el.preventDefault();
    const values: Partial<{
      cant: string | null;
      addresDest: string | null;
      caducidad: string | null;
    }> = this.forms.value;

    if (!values.caducidad) {
      values.caducidad = (new Date().getTime() + 600000).toString(); //	600000  son 10minutos
    }
    const body = {
      cant: parseInt(values.cant?.toString() || '0'),
      addressDest: values.addresDest?.toString(),
      addresOrigin: this.myAddress,
      caducidad: new Date(values.caducidad).getTime(),
    };
    this.store.dispatch(
      setAlert({
        value: {
          menssage: 'Transaccion enviada',
          icon: 'warning',
          title: 'Transaccion',
          timer: 2000,
        },
      })
    );
    setTimeout(() => {
      this.socketService.emitSocket(
        environment.events.emits.transacciones.crearTransaccion,
        body
      );
    }, 2000);
  }
}
