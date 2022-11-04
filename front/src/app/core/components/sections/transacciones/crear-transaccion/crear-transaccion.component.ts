import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crear-transaccion',
  templateUrl: './crear-transaccion.component.html',
  styleUrls: ['./crear-transaccion.component.scss'],
})
export class CrearTransaccionComponent implements OnInit {
  public forms: any;
  constructor(private fb: FormBuilder) {
    this.forms = this.fb.group({
      cant: ['', [Validators.min(0)]],
      addresDest: [''],
      caducidad: [],
    });
  }

  ngOnInit(): void {}
  submitData(el: Event) {
    el.preventDefault();
    console.log(this.forms.values);
  }
}
