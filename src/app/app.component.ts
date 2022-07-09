import { DataSource } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './api.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['productCode', 'productBrand', 'releaseDate', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matDialog: MatDialog, private apiService: ApiService) {

  }

  ngOnInit(): void {

    this.getProducts();

  }

  openDialog() {
    this.matDialog.open(DialogComponent)
      .afterClosed().subscribe(value => {
        if (value === 'Submit') {
          this.getProducts();
        }
      });
  }

  getProducts() {
    this.apiService.getProducts()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          alert(error);
        }
      })
  }

  updateProduct(row) {
    this.matDialog.open(DialogComponent, {
      data: row
    }).afterClosed().subscribe(value => {
      if (value === 'Update') {
        this.getProducts();
      }
    });
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getProducts();
        }, error: (error) => {
          alert(error);
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
