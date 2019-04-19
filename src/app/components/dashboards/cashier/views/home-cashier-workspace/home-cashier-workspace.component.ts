import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderState } from '../../../../../helpers';
import { OrderService, AuthService, NotificationService } from '../../../../../services';
import { Order } from '../../../../../models';
import { Config } from '../../../../../infrastructure';

@Component({
  selector: 'app-home-cashier-workspace',
  templateUrl: './home-cashier-workspace.component.html',
  styleUrls: ['./home-cashier-workspace.component.scss']
})
export class HomeCashierWorkspaceComponent implements OnInit {
  public columnsToDisplay = ['createdDate', 'pickupTime', 'provider', 'paid', 'status'];
  public dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  orderState = OrderState.Pending;
  providerId: string;
  orders: Order [];
  ordersPending: Order [];
  ordersReady: Order [];
  ordersCompleted: Order [];
  ordersCanceled: Order [];

  pageSizeOptions = Config.pageSizeOptions;
  observer$: Observable<any>;
  message: string;
  state = 'waiting';

  constructor(
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
    private readonly notification: NotificationService
  ) {}

  ngOnInit() {
    this.providerId = this.authService.currentUserValue.parentId;

    this.observer$ = this.orderService.getAllOrdersByProviderId(this.providerId);
    this.observer$.subscribe(
      orders => {
        this.orders = orders;
        this.state = 'finished';

        // Filter orders by status
        this.ordersPending = this.orders.filter(order => order.status === OrderState.Pending);
        this.ordersReady = this.orders.filter(order => order.status === OrderState.Ready);
        this.ordersCompleted = this.orders.filter(order => order.status === OrderState.Completed);
        this.ordersCanceled = this.orders.filter(order => order.status === OrderState.Canceled);

        if (this.orderState === OrderState.Pending) {
          this.onClickPendingOrders();
        } else if (this.orderState === OrderState.Ready) {
          this.onClickReadyOrders();
        } else if (this.orderState === OrderState.Completed) {
          this.onClickCompletedOrders();
        } else {
          this.onClickCanceledOrders();
        }
      },
      error => {
        this.state = 'failed';
        this.notification.ErrorMessage(error.message, '', 2500);
      }
    );
  }

  onClickPendingOrders() {
    this.message = null;
    this.orderState = OrderState.Pending;

    if (this.ordersPending.length === 0) {
      this.message = 'There are no pending orders';
    } else {
      this.dataSource = new MatTableDataSource(this.ordersPending);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onClickReadyOrders() {
    this.message = null;
    this.orderState = OrderState.Ready;

    if (this.ordersReady.length === 0) {
      this.message = 'There are no ready orders';
    } else {
      this.dataSource = new MatTableDataSource(this.ordersReady);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onClickCompletedOrders() {
    this.message = null;
    this.orderState = OrderState.Completed;

    if (this.ordersCompleted.length === 0) {
      this.message = 'There are no completed orders';
    } else {
      this.dataSource = new MatTableDataSource(this.ordersCompleted);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onClickCanceledOrders() {
    this.message = null;
    this.orderState = OrderState.Canceled;

    if (this.ordersCanceled.length === 0) {
      this.message = 'There are no canceled orders';
    } else {
      this.dataSource = new MatTableDataSource(this.ordersCanceled);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  updateStatus(order: Order, status: string) {
    order.status = status;
    this.orderService.update(order).then(() => {
      this.notification.SuccessMessage(`The status of the order is ${status}`, '', 2500);
    })
    .catch(error => {
      this.notification.ErrorMessage(error.message, '', 2500);
    });
  }
}
