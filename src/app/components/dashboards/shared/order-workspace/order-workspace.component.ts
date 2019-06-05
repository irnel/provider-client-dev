import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Order } from '../../../../models';
import { Config } from '../../../../infrastructure';
import { OrderState, Roles } from '../../../../helpers';
import { OrderService, NotificationService, DateService } from '../../../../services';


@Component({
  selector: 'app-order-workspace',
  templateUrl: './order-workspace.component.html',
  styleUrls: ['./order-workspace.component.scss']
})
export class OrderWorkspaceComponent implements OnInit, OnDestroy {
  public columnsToDisplay = ['createdDate', 'pickupTime', 'provider', 'paid', 'status', 'view'];
  public dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('frame') frame: any;

  subscription: Subscription;
  pageSizeOptions = Config.pageSizeOptions;
  orderState = OrderState.Pending;
  userId: string;
  providerId: string;
  cashierId: string;
  isAdmin: boolean;
  userRole: string;
  orders: Order [];
  observer$: Observable<any>;
  message: string;
  state = 'waiting';
  selectedOrder: Order;
  currentDate: Date;
  date: FormControl;
  currentDateFormat: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private readonly orderService: OrderService,
    private readonly dateService: DateService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(data => this.userRole = data.role);
    this.providerId = this.route.snapshot.params['providerId'];

    if (this.userRole === Roles.Admin) {
      this.userId = this.route.snapshot.params['userId'];
    }

    this.subscription = this.dateService.currentDateSubject.subscribe(
      date => {
        !date
          ? this.getAllOrdersByDate(new Date())
          : this.getAllOrdersByDate(date);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  redirectToOrderDetails(orderId) {
    this.ngZone.run(() => {
      let url = '';
      if (this.userRole === Roles.Admin) {
        url = `admin-dashboard/workspace/users/${this.userId}/providers/${this.providerId}/orders/${orderId}/date/` +
              `${this.currentDate.getDate()}/${this.currentDate.getMonth()}/${this.currentDate.getFullYear()}/details`;
      } else if (this.userRole === Roles.Provider) {
        url = `provider-dashboard/workspace/providers/${this.providerId}/orders/${orderId}/date/` +
              `${this.currentDate.getDate()}/${this.currentDate.getMonth()}/${this.currentDate.getFullYear()}/details`;
      }

      this.router.navigate([url]);
    });
  }

  getAllOrdersByDate(date: Date) {
    this.currentDate = date;
    this.date = new FormControl(date);
    this.observer$ = this.orderService.getAllOrdersByProviderId(this.providerId, this.currentDate);
    this.observer$.subscribe(
      orders => {
        this.orders = orders;
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.state = 'finished';
      },
      error => {
        this.state = 'failed';
        this.notification.ErrorMessage(error.message, '', 2500);
      }
    );
  }
}
