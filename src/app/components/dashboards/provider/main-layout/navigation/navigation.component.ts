import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { AuthService } from './../../../../../services';

import { User } from '../../../../../models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  private currentSubscription: Subscription;
  currentUser: User;

  @ViewChild('sidenav') sidenav: ElementRef;
  clicked: boolean;

  constructor(
    private router: Router,
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
