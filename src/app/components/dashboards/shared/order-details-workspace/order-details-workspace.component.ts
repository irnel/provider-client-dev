import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DateService, NotificationService, OrderService } from '../../../../services';
import { Order } from '../../../../models';
import { Roles } from '../../../../helpers';

@Component({
  selector: 'app-order-details-workspace',
  templateUrl: './order-details-workspace.component.html',
  styleUrls: ['./order-details-workspace.component.scss']
})
export class OrderDetailsWorkspaceComponent implements OnInit {
  userId: string;
  providerId: string;
  cashierId: string;
  orderId: string;
  userRole: string;
  order: Order;
  observer$: Observable<any>;
  date: Date;
  state = 'waiting';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private readonly orderService: OrderService,
    private readonly dateService: DateService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit() {
    this.route.parent.data.subscribe(data => this.userRole = data.role);

    // Role Admin
    if (this.userRole === Roles.Admin) {
      this.userId = this.route.snapshot.params['userId'];
    }

    this.providerId = this.route.snapshot.params['providerId'];
    this.orderId = this.route.snapshot.params['orderId'];
    const year = this.route.snapshot.params['year'];
    const month = this.route.snapshot.params['month'];
    const day = this.route.snapshot.params['day'];
    this.date = new Date(year, month, day);
    // send date event
    this.dateService.sendDate(this.date);

    this.observer$ = this.orderService.getOrderData(this.providerId, this.orderId, this.date);
    this.observer$.subscribe(
      order => {
        this.order = order;
        this.state = 'finish';
      },
      error => {
        this.state = 'failed';
        this.notification.ErrorMessage(error.message, '', 2500);
      }
    );
  }

  redirectToAdminHome() {
    this.ngZone.run(() => {
      this.router.navigate(['admin-dashboard/workspace/home']);
    });
  }

  redirectToProviderHome() {
    this.ngZone.run(() => {
      this.router.navigate(['provider-dashboard/workspace/home']);
    });
  }

  redirectToCashierHome() {
    this.ngZone.run(() => {
      this.router.navigate(['cashier-dashboard/workspace/home']);
    });
  }

  get total() {
    return this.order.products.map(p => p.price).reduce((total, price) => total + price);
  }

  valueToString(value) {
    return String(value);
  }
}
