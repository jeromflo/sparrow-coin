import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<{ login: string[] }>) {
    this.store.select('login').subscribe((data) => {
      this.hashLogin = data.toString().hashCode();
    });
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
