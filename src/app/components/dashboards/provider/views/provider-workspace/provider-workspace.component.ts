import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Config } from '../../../../../infrastructure';
import { Provider, PROVIDERS_DATA } from '../../../../../helpers';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-provider-workspace',
  templateUrl: './provider-workspace.component.html',
  styleUrls: ['./provider-workspace.component.scss']
})
export class ProviderWorkspaceComponent implements OnInit {

  columnsToDisplay: string [] = ['image', 'name', 'address', 'description', 'operation'];
  dataSource: MatTableDataSource<Provider>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  providers = PROVIDERS_DATA;
  maxChar: number = Config.maxChar;
  pageSizeOptions: number[] = Config.pageSizeOptions;
  value = '';

  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.providers);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  redirectToHome() {
    this.router.navigate(['provider-dashboard/workspace/home']);
  }

  // redirect to edit provider
  redirectToEditProvider(id: number) {
    this.router.navigate([`provider-dashboard/workspace/providers/${id}/edit`]);
  }

  // redirect to provider details
  redirectToProviderDetails(id: number) {
    this.router.navigate([`provider-dashboard/workspace/providers/${id}/details`]);
  }

  // apply filter to data table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.paginator.firstPage();
    }
  }
}
