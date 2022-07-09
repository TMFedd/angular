import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  form!: FormGroup;
  actionBtn: string = "Submit";
  brands: any[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.getLanguages();
    this.getBrands();

    this.form = this.formBuilder.group({
      productCode: ['', Validators.required],
      productBrand: ['', Validators.required],
      releaseDate: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.form.controls['productCode'].setValue(this.editData.productCode);
      this.form.controls['productBrand'].setValue(this.editData.productBrand);
      this.form.controls['releaseDate'].setValue(this.editData.releaseDate);
    }

  }

  addProduct() {
    if (!this.editData) {
      if (this.form.valid) {
        this.apiService.createProduct(this.form.value)
          .subscribe({
            next: (response) => {
              console.log(response);
              this.form.reset();
              this.dialogRef.close('Submit');
            },
            error: (error) => {
              alert('error');
            }
          })
      }
    }
    else {
      this.updateProduct();
    }
  }

  updateProduct() {
    if (this.form.valid) {
      this.apiService.updateProduct(this.form.value, this.editData.id)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.form.reset();
            this.dialogRef.close('Update');
          },
          error: (error) => {
            alert('error');
          }
        })
    }
  }

  getLanguages() {
    this.apiService.getLanguages()
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          alert('error');
        }
      })
  }

  getBrands() {
    this.apiService.getBrands()
      .subscribe({
        next: (response) => {
          this.brands = response;
          console.log(response);
        },
        error: (error) => {
          alert('error');
        }
      })
  }


}
