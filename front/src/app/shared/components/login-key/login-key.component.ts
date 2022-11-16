import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  fadeAnimation,
  fadeAnimation2,
} from '../../animations/fadeAnimation.animations';

@Component({
  selector: 'app-login-key',
  templateUrl: './login-key.component.html',
  styleUrls: ['./login-key.component.scss'],
  animations: [fadeAnimation],
})
export class LoginKeyComponent implements OnInit {
  hashLogin = '';
  visibleCopyButton = false;
  private subscribe: Subscription = new Subscription();
  constructor(private store: Store<{ login: string[] }>) {
    this.subscribe.add(
      this.store.select('login').subscribe((data) => {
        this.hashLogin = data.hashCode();
      })
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {}
  copyHash() {
    this.visibleCopyButton = true;
    navigator.clipboard.writeText(this.hashLogin);
    setTimeout(() => {
      this.visibleCopyButton = false;
    }, 1000);
  }
}
