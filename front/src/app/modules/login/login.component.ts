import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
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
  private subscribe: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private store: Store<{ login: string[] }>
  ) {
    this.formsGroup = this.fb.group({
      formsArray: this.fb.array([]),
    });
    this.subscribe.add(
      this.store
        .select('login')
        .pipe(
          tap((data) => {
            if (!(data.length > 0)) {
              this.numberKeys = '9';
              this.createArray();
            }
          }),
          filter((el) => el.hashCode() !== this.hashLogin),
          filter((el) => el.length > 0),
          tap((el) => {
            this.hashLogin = el.hashCode();
          })
        )
        .subscribe((data) => {
          this.resetFormsArray();

          data?.forEach((el) => {
            this.formsArray.push(this.fb.control('', Validators.required));
          });
          this.formsArray.patchValue(data);
          this.numberKeys = data.length.toString();
          // this.route.navigate(['/principal']);
        })
    );
    this.subscribe.add(
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
        .subscribe()
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
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
      this.route.navigate(['/principal']);
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
