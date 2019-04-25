import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, NotificationService, OrderService } from '../../../../services';
import { Order } from '../../../../models';


@Component({
  selector: 'app-order-details-workspace',
  templateUrl: './order-details-workspace.component.html',
  styleUrls: ['./order-details-workspace.component.scss']
})
export class OrderDetailsWorkspaceComponent implements OnInit {
  userId: string;
  providerId: string;
  orderId: string;
  isAdmin: boolean;
  order: Order;
  observer$: Observable<any>;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin) {
      this.userId = this.route.snapshot.params['userId'];
    }

    this.providerId = this.route.snapshot.params['providerId'];
    this.orderId = this.route.snapshot.params['orderId'];
    this.observer$ = this.orderService.getOrderData(this.providerId, this.orderId, new Date());
    this.observer$.subscribe(
      order => {
        this.order = order;
        this.state = 'waiting';
      },
      error => {
        this.state = 'failed';
        this.notification.ErrorMessage(error.message, '', 2500);
      }
    );
  }

}
