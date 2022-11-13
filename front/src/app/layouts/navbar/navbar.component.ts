import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { reset } from 'src/app/shared/redux/actions/comun/loging.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  dropdown = false;
  constructor(private store: Store, private router: Router) {}
  cerrarSesion() {
    this.store.dispatch(reset());
    this.router.navigate(['/login']);
  }
}
