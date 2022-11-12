import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fadeAnimation2 } from 'src/app/shared/animations/fadeAnimation.animations';
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
  private myAddress = 0;

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
    this.store.select('login').subscribe((data) => {
      this.myAddress = data.toString().hashCode();
    });
    this.forms = this.fb.group({
      cant: ['1', [Validators.min(0)]],
      addresDest: ['2311'],
      caducidad: ['2022-11-12'],
    });
    const pathNuevaTransaccion = ['transacciones', 'transacciones'];
    this.socketService.getOn(pathNuevaTransaccion);
    this.socketService
      .getObservable(pathNuevaTransaccion)
      .subscribe(console.log);
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
      cant: values.cant,
      addressDest: values.addresDest,
      addresOrigin: this.myAddress,
      caducidad: values.caducidad,
    };

    this.socketService.emitSocket(
      environment.events.emits.transacciones.crearTransaccion,
      body
    );
  }
}
