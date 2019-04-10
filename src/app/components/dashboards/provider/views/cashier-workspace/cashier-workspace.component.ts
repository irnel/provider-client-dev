import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Config } from '../../../../../infrastructure';
import { Cashier, Provider, CASHIER_DATA, PROVIDERS_DATA } from '../../../../../helpers';


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

  providers: Provider [] = PROVIDERS_DATA;
  currentProvider: Provider;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.cashiers);
  }

  ngOnInit() {
    const providerId = +this.route.snapshot.params['id'];
    this.currentProvider = this.providers.find(p => p.id === providerId);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  redirectToEditCashier(id: number) {
    this.router.navigate([
      `provider-dashboard/workspace/providers/${this.currentProvider.id}/cashiers/${id}/edit`
    ]);
  }

}
