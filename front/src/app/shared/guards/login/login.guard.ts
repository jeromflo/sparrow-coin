import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad, OnDestroy {
  private subscription: Subscription = new Subscription();
  keys: string[] = [];
  constructor(
    private store: Store<{ login: string[] }>,
    private router: Router
  ) {
    this.subscription.add(
      this.store.select('login').subscribe((data) => {
        this.keys = data;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.keys.length > 0) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
