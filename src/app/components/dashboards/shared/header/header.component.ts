import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { AuthService } from './../../../../services';
import { User } from './../../../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public logOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  public onToggleSideNav = () => {
    this.sidenavToggle.emit();
  }

}
