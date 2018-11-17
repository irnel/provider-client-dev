import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService } from './../../../../../services';

import { User } from '../../../../../models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  private currentSubscription: Subscription;
  currentUser: User;
  clicked: boolean;

  @ViewChild('sidenav') sidenav: ElementRef;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService
  ) {
    this.clicked = this.clicked === undefined ? false : true;

    this.currentSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentSubscription.unsubscribe();
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
