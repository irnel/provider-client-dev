import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Config } from '../../../../../infrastructure';
import { Cashier, CASHIER_DATA } from '../../../../../helpers';

@Component({
  selector: 'app-cashier-workspace',
  templateUrl: './cashier-workspace.component.html',
  styleUrls: ['./cashier-workspace.component.scss']
})
export class CashierWorkspaceComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'email', 'provider', 'operation'];
  dataSource: MatTableDataSource<Cashier>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cashiers = CASHIER_DATA;
  pageSizeOptions: number[] = Config.pageSizeOptions;

  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.cashiers);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  redirectToEditCashier(id: number) {
    this.router.navigate([`provider-dashboard/workspace/cashiers/${id}/edit`]);
  }

}
