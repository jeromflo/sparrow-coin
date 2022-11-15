import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { listAnimation } from 'src/app/shared/animations/listAnimations.animations';
import { setKeys } from 'src/app/shared/redux/actions/comun/loging.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [listAnimation],
})
export class LoginComponent {
  numberKeys = '9';
  formsGroup;
  private hashLogin: string = '0000';
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private store: Store<{ login: string[] }>
  ) {
    this.formsGroup = this.fb.group({
      formsArray: this.fb.array([]),
    });
    this.store
      .select('login')
      .pipe(
        tap((data) => {
          if (!(data.length > 0)) {
            this.numberKeys = '9';
            this.createArray();
          }
        }),
        filter((el) => el.toString().hashCode() !== this.hashLogin),
        tap((el) => {
          this.hashLogin = el.toString().hashCode();
        })
      )
      .subscribe((data) => {
        this.resetFormsArray();

        data?.forEach((el) => {
          this.formsArray.push(this.fb.control('', Validators.required));
        });
        this.formsArray.patchValue(data);
        this.numberKeys = data.length.toString();
        this.route.navigate(['/principal']);
      });
    this.formsArray.valueChanges
      .pipe(
        filter((data: []) => data.length > 0),
        filter((data: []) => {
          let haveNull = false;
          data.forEach((el: string) => {
            if (!el) {
              haveNull = true;
            }
          });
          return !haveNull;
        })
      )
      .subscribe();
  }
  get formsArray() {
    return this.formsGroup.get('formsArray') as FormArray;
  }
  resetFormsArray() {
    this.formsArray.clear();
  }

  submitData(el: Event) {
    if (
      this.formsArray.valid &&
      this.formsArray.value.toString().hashCode() !== this.hashLogin
    ) {
      this.store.dispatch(setKeys({ data: this.formsArray.value }));
    }
  }
  createArray() {
    this.resetFormsArray();
    setTimeout(() => {
      new Array<number>(parseInt(this.numberKeys))
        .fill(0)
        .forEach((el, index) => {
          this.formsArray.push(this.fb.control('', Validators.required));
        });
    }, 300);
  }
}
