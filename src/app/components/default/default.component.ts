import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { Roles } from '../../helpers';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {
    // redirect to specific dashboard if already logged in
    this.authService.currentUser.subscribe(currentUser => {
      if (currentUser) {
        currentUser.roles.forEach(rol => {
          if (rol === Roles.Admin) {
            // redirect to admin dashboard
            this.router.navigate(['/admin-dashboard/workspace/home']);
          } else if (rol === Roles.Provider) {
            this.router.navigate(['/provider-dashboard/workspace/home']);
          } else {
            // redirect to cashier dashboard
          }
        });
      }
    });
  }

  ngOnInit() {
  }
}
