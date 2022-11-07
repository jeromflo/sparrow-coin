import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-crear-transaccion',
  templateUrl: './crear-transaccion.component.html',
  styleUrls: ['./crear-transaccion.component.scss'],
})
export class CrearTransaccionComponent implements OnInit {
  public forms: FormGroup<{
    cant: FormControl<string | null>;
    addresDest: FormControl<string | null>;
    caducidad: FormControl<string | null>;
  }>;
  constructor(
    private fb: FormBuilder,
    private store: Store<{ login: string[] }>
  ) {
    this.store.select('login').subscribe((data) => {
      console.log(data);
    });
    this.forms = this.fb.group({
      cant: ['', [Validators.min(0)]],
      addresDest: [''],
      caducidad: [''],
    });
  }

  ngOnInit(): void {}
  submitData(el: Event) {
    el.preventDefault();
    const values: Partial<{
      cant: string | null;
      addresDest: string | null;
      caducidad: string | null;
    }> = this.forms.value;
  }
}
