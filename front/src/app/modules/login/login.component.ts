import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { listAnimation } from 'src/app/shared/animations/listAnimations.animations';
import { setKeys } from 'src/app/shared/redux/actions/loging.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [listAnimation],
})
export class LoginComponent {
  numberKeys = '9';
  formsGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<{ login: string[] }>
  ) {
    this.formsGroup = this.fb.group({
      formsArray: this.fb.array([]),
    });
    this.store.select('login').subscribe((data) => {
      this.resetFormsArray();
      data?.forEach((el) => {
        this.formsArray.push(this.fb.control(''));
      });

      this.formsArray.patchValue(data);
      this.numberKeys = data.length.toString();
      console.log(data.length);
      if (!(data.length > 0)) {
        this.createArray();
        this.numberKeys = '9';
      }
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
      .subscribe((data) => {
        console.log(data);
      });
  }
  get formsArray() {
    return this.formsGroup.get('formsArray') as FormArray;
  }
  resetFormsArray() {
    this.formsArray.clear();
  }

  submitData(el: Event) {
    console.log(this.formsArray.value);
    this.store.dispatch(setKeys({ data: this.formsArray.value }));
  }
  createArray() {
    this.resetFormsArray();
    setTimeout(() => {
      new Array<number>(parseInt(this.numberKeys))
        .fill(0)
        .forEach((el, index) => {
          this.formsArray.push(this.fb.control(''));
        });
    }, 300);
  }
}
